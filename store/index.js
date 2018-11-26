import Vuex from "vuex";
import Cookie from "js-cookie";

const createStore = () => {
    return new Vuex.Store({
        state: {
            members: [],
            groups: [],
            branches: [],
            commons: [],
            loading: false,
            busy: false,
            error: null,
            success: false,
            token: null
        },
        getters: {
            isAuthenticated(state){
                return state.token != null;
            },
            loadedMembers(state) {
                return state.members;
            },
            loadedGroups(state){
                return state.groups;
            },
            loadedBranches(state){
                return state.branches;
            },
            loadedCommons(state){
                return state.commons;
            },
            loading (state) {
                return state.loading
            },
            error (state) {
                return state.error
            },
            busy (state) {
                return state.busy
            },
            success (state) {
                return state.success
            }
        },
        mutations: {
            setMembers(state, members) {
                state.members = members
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
            setBranches(state, branches) {
                state.branches = branches
            },
            addBranch(state, branch) {
                state.branches.push(branch)
            },
            editBranch(state, editedBranch) {
                const branchIndex = state.branches.findIndex(
                  branch => branch.id === editedBranch.id
                );
                state.branches[branchIndex] = editedBranch
            },
            setCommons(state, commons) {
                state.commons = commons
            },
            addCommon(state, common) {
                state.commons.push(common)
            },
            editCommon(state, editedCommon) {
                const index = state.commons.findIndex(
                  common => common.id === editedCommon.id
                );
                state.commons[index] = editedCommon
            },
            setToken(state, token) {
                state.token = token;
            },
            setLoading (state, payload) {
                state.loading = payload
            },
            setBusy(state, payload) {
                state.busy = payload
            },
            setError (state, payload) {
                state.error = payload
            },
            setSuccess (state, payload) {
                state.success = payload
            },
            clearSuccess (state) {
                state.success = false
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
            addMember({commit,state}, member) {
                const memberBranch = state.branches.find(element => element.id == member.branch);
                const createdMember = {
                    ...member,
                    branchName: memberBranch.branchName,
                    createdDate: new Date()
                }
                return this.$axios
                .$post(
                    "https://anadolu-vakfi.firebaseio.com/members.json?auth=" +state.token, createdMember)
                .then(data => {
                    commit('addMember', {...createdMember, id: data.name})
                })
                .catch(e => console.log(e));
            },
            editMember({commit,state}, member) {
                const memberBranch = state.branches.find(element => element.id == member.branch);

                const editedMember = {
                    ...member,
                    branchName: memberBranch.branchName,
                    updatedDate: new Date()
                }
                return this.$axios
                .$put("https://anadolu-vakfi.firebaseio.com/members/" +
                editedMember.id +
                ".json?auth=" + state.token, editedMember)
                .then(res => {
                    commit('editMember', editedMember)
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
            loadBranches({commit}){
                commit('setLoading', true)
                return this.$axios
                    .$get("/branches.json")
                    .then(data => {
                        const branchesArray = [];
                        for(const key in data){
                            branchesArray.push({ ...data[key], id: key });
                        }
                        commit("setBranches", branchesArray);
                        commit('setLoading', false);
                    })
                    .catch(e => {
                        commit('setLoading', false)
                        context.error(e)
                    });
            },
            addBranch(vuexContext, branch) {
                const createdBranch = {
                    ...branch,
                    updatedDate: new Date()
                }
                return this.$axios
                .$post(
                    "https://anadolu-vakfi.firebaseio.com/branches.json?auth=" +vuexContext.state.token, createdBranch)
                .then(data => {
                    vuexContext.commit('addBranch', {...createdBranch, id: data.name})
                })
                .catch(e => console.log(e));
            },
            editBranch(vuexContext, editedBranch) {
                console.log("edited member id : " +editedBranch.id)
                return this.$axios
                .$put("https://anadolu-vakfi.firebaseio.com/branches/" +
                editedBranch.id +
                ".json?auth=" + vuexContext.state.token, editedBranch)
                .then(res => {
                    vuexContext.commit('editBranch', editedBranch)
                })
                .catch(e => console.log(e))
            },
            clearError ({commit}) {
                commit('clearError')
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
            loadCommons({commit}){
                commit('setLoading', true)
                return this.$axios
                    .$get("/commons.json")
                    .then(data => {
                        const commonsArray = [];
                        for(const key in data){
                            commonsArray.push({ ...data[key], id: key });
                        }
                        commit("setCommons", commonsArray);
                        commit('setLoading', false);
                    })
                    .catch(e => {
                        commit('setLoading', false)
                        commit('setError', e.response.data.error)
                    });
            },

            addCommon({commit,state}, newCommon) {
                commit('setSuccess', false)
                commit('setBusy', true)
                return this.$axios
                .$post(
                    "https://anadolu-vakfi.firebaseio.com/commons.json?auth=" +state.token, newCommon)
                .then(data => {
                    commit('addCommon', {...newCommon, id: data.name})
                    commit('setBusy', false);
                    commit('setSuccess', true)
                })
                .catch(e => {
                    commit('setBusy', false)
                    commit('setError', e.response.data.error)
                    commit('setSuccess', false)
                });
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