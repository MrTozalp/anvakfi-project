import Vuex from "vuex";
import Cookie from "js-cookie";

const createStore = () => {
    return new Vuex.Store({
        state: {
            members: [],
            loading: false,
            error: null,
            token: null
        },
        getters: {
            isAuthenticated(state){
                return state.token != null;
            },
            loadedMembers(state) {
                return state.members;
            },
            loading (state) {
                return state.loading
            },
            error (state) {
                return state.error
            }
        },
        mutations: {
            setMembers(state, members) {
                state.members = members;
            },
            addMember(state, member) {
                state.members.push(member)
            },
            editMember(state, editedMember) {
              const memberIndex = state.members.findIndex(
                member => member.id === editedMember.id
              );
              state.members[memberIndex] = editedMember
            },
            deleteMember(state, deletedMember) {
                const memberIndex = state.members.findIndex(
                    member => member.id === deletedMember.id
                );
                state.members.splice(memberIndex,1);
            },
            setToken(state, token) {
                state.token = token;
            },
            setLoading (state, payload) {
                state.loading = payload
            },
            setError (state, payload) {
                state.error = payload
            },
            clearError (state) {
                state.error = null
            },

            clearToken(state) {
                state.token = null;
            }

        },
        actions: {
            loadMembers({commit}) {
                commit('setLoading', true)
                return this.$axios
                    .$get("/members.json")
                    .then(data => {
                        const membersArray = [];
                        for(const key in data){
                            membersArray.push({ ...data[key], id: key });
                        }
                        commit("setMembers", membersArray);
                        commit('setLoading', false);
                    })
                    .catch(e => {
                        commit('setLoading', false)
                        context.error(e)
                    });
            },
            clearError ({commit}) {
                commit('clearError')
            },
            addMember(vuexContext, member) {
                const createdMember = {
                    ...member,
                    updatedDate: new Date()
                }
                return this.$axios
                .$post(
                    "https://anadolu-vakfi.firebaseio.com/members.json?auth=" +vuexContext.state.token, createdMember)
                .then(data => {
                    vuexContext.commit('addMember', {...createdMember, id: data.name})
                })
                .catch(e => console.log(e));
            },
            editMember(vuexContext, editedMember) {
                console.log("edited member id : " +editedMember.id)
                return this.$axios
                .$put("https://anadolu-vakfi.firebaseio.com/members/" +
                editedMember.id +
                ".json?auth=" + vuexContext.state.token, editedMember)
                .then(res => {
                    vuexContext.commit('editMember', editedMember)
                })
                .catch(e => console.log(e))
            },
            deleteMember(vuexContext, deletedMember) {
                return this.$axios
                .$delete("https://anadolu-vakfi.firebaseio.com/members/" +
                deletedMember.id +
                ".json?auth="+ vuexContext.state.token, deletedMember)
                .then(res => {
                    vuexContext.commit('deleteMember', deletedMember)
                })
                .catch(e => console.log(e))
            },
            authenticateUser(vuexContext, authData) {
                vuexContext.commit('setLoading', true)
                vuexContext.commit('clearError')
                let authUrl =
                  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
                  process.env.fbAPIKey;
                return this.$axios
                  .$post(authUrl, {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                  })
                  .then(result => {
                    vuexContext.commit('setLoading', false)
                    vuexContext.commit("setToken", result.idToken);
                    localStorage.setItem("token", result.idToken);
                    localStorage.setItem(
                      "tokenExpiration",
                      new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
                    );
                    Cookie.set("jwt", result.idToken);
                    Cookie.set(
                      "expirationDate",
                      new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
                    );
                  })
                  .catch(error => {
                    vuexContext.commit('setLoading', false)
                    vuexContext.commit('setError', error.response.data.error)
                  }
                )
              },
              initAuth(vuexContext, req) {
                let token;
                let expirationDate;
                if (req) {
                  if (!req.headers.cookie) {
                    return;
                  }
                  const jwtCookie = req.headers.cookie
                    .split(";")
                    .find(c => c.trim().startsWith("jwt="));
                  if (!jwtCookie) {
                    return;
                  }
                  token = jwtCookie.split("=")[1];
                  expirationDate = req.headers.cookie
                    .split(";")
                    .find(c => c.trim().startsWith("expirationDate="))
                    .split("=")[1];
                } else {
                  token = localStorage.getItem("token");
                  expirationDate = localStorage.getItem("tokenExpiration");
                }
                if (new Date().getTime() > +expirationDate || !token) {
                  console.log("No token or invalid token");
                  vuexContext.dispatch("logout");
                  return;
                }
                vuexContext.commit("setToken", token);
              },
              logout(vuexContext) {
                vuexContext.commit("clearToken");
                Cookie.remove("jwt");
                Cookie.remove("expirationDate");
                if (process.client) {
                  localStorage.removeItem("token");
                  localStorage.removeItem("tokenExpiration");
                }
              }
        }
    });
};

export default createStore;