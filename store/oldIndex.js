import Vuex from "vuex";
import Cookie from "js-cookie";

const createStore = () => {
    return new Vuex.Store({
        state: {
            members: [],
            groups: [],
            branches: [],
            commons: [],
            moduleCommons: [],
            loading: false,
            selectedCommon: null,
            busy: false,
            error: null,
            success: false,
            token: null,
            commonList: [],
            commonValues: [],
            modules: [
                {text: "Üyeler" , value: "member"},
                {text: "Şubeler", value: "branch"},
                {text: "Gruplar", value: "group"}
            ],
        },
        getters: {
            modules(state){
                return state.modules
            },
            selectedCommonChild(state){
                if(!(state.selectedCommon === undefined || state.selectedCommon === null)){
                    return state.commonValues.find((commonValue) => {
                        return commonValue.parent === state.selectedCommon.id
                    })
                }
                else return {}
                    
            },
            selectedCommon(state){
                if(state.selectedCommon === undefined || state.selectedCommon === null) 
                    state.selectedCommon = state.commons[0]
                return state.selectedCommon
            },
            isAuthenticated(state){
                return state.token != null;
            },
            loadedMembers(state) {
                return state.members;
            },
            fetchMember(state) {
                return (id) => {
                  return state.members.find((member) => {
                    return member.id === id
                  })
                }
            },
            selectedCommonList(state){
                return(value) => {
                    return state.commonList.filter((listItem) => {
                        return listItem.value === value
                    })
                }
            },
            loadedModuleCommons(state){
                return state.moduleCommons
            },
            loadedGroups(state){
                return state.groups
            },
            loadedBranches(state){
                return state.branches
            },
            loadedCommons(state){
                return state.commons
            },
            fetchCommon (state) {
                return (id) => {
                  return state.commonList.find((common) => {
                    return common.id === id
                  })
                }
            },
            commonName (state) {
                return(value) => {
                    return state.commonValues.find((common) => {
                        return common.value === value
                    }).text
                }
            },
            commonValues(state){
                return state.commonValues
            },

            fetchCommonItem(state) {
                return(item) => {
                    return state.selectedCommon.items.find((commonItem) => {
                        return commonItem === item
                    })
                }
            },
            /*
            moduleCommonsByModuleName(state){
                return(moduleValue) => {
                    return state.moduleCommons.filter(moduleCommon => moduleCommon.module.value === moduleValue)
                }
            },
            modulesBySelectedCommon(state){
                let modules = []
                if( state.selectedCommon.name !== null && state.selectedCommon.name !== undefined){
                    let moduleCommons = state.moduleCommons.filter(moduleCommon => moduleCommon.commonItem.id === state.selectedCommon.id)
                    moduleCommons.forEach(item => {
                        modules.push(item.module)

                    })
                }

                return modules
            },*/
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
            setSelectedCommon(state, common){
                
                state.selectedCommon = common
            },
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
            deleteBranch(state, deletedBranch){
                const index = state.branches.findIndex(
                    branch => branch.id === deletedBranch.id
                );
                state.branches.splice(index,1);
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
            deleteCommonItem(state, deletedCommon) {
                const index = state.commonList.findIndex(
                    common => common.id === deletedCommon.id
                );
                state.commonList.splice(index,1);
            },
            setCommons(state, commons) {
                state.commons = commons
            },
            /*
            addCommon(state, common) {
                state.commons.push(common)
            },*/
            setCommonList(state, commonList) {
                state.commonList = commonList
            },
            setCommonValues(state, commonValues){
                state.commonValues = commonValues
            },
            addCommonItem(state, newItem) {
                state.commonList.push(newItem)
            },
            editCommon(state, editedCommon) {
                let itemToUpdate = state.commonList.find(
                  common => common.id == editedCommon.id
                );
                Object.assign(itemToUpdate,editedCommon)
            },

            setModuleCommons(state, moduleCommons) {
                Object.assign(state.moduleCommons, moduleCommons)
            },
            addModuleCommon(state, moduleCommon){
                state.moduleCommons.push(moduleCommon)
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
                const memberBranch = state.branches.find(element => element.id == member.branch)
                const memberGender = state.commonList.find(element => element.id == member.gender)
                const memberOccupation = state.commonList.find(element => element.id == member.occupation)
                const memberHometown = state.commonList.find(element => element.id == member.hometown)
                const createdMember = {
                    ...member,
                    hometownName: memberHometown ? memberHometown.name : '',
                    branchName: memberBranch ? memberBranch.branchName : '',
                    genderName: memberGender ? memberGender.name : '',
                    occupationName: memberOccupation ? memberOccupation.name : '',
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
                const memberBranch = state.branches.find(element => element.id == member.branch)
                const memberGender = state.commonList.find(element => element.id == member.gender)
                const memberOccupation = state.commonList.find(element => element.id == member.occupation)
                const memberHometown = state.commonList.find(element => element.id == member.hometown)
                const editedMember = {
                    ...member,
                    hometownName: memberHometown ? memberHometown.name : '',
                    branchName: memberBranch ? memberBranch.branchName : '',
                    genderName: memberGender ? memberGender.name : '',
                    occupationName: memberOccupation ? memberOccupation.name : '',
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
            deleteBranch(vuexContext, deletedBranch) {
                return this.$axios
                .$delete("https://anadolu-vakfi.firebaseio.com/branches/" +
                deletedBranch.id +
                ".json?auth="+ vuexContext.state.token, deletedBranch)
                .then(res => {
                    vuexContext.commit('deleteBranch', deletedBranch)
                })
                .catch(e => console.log(e))
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
            /*
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
            },*/
            deleteCommonItem(vuexContext, deletedCommon) {
                return this.$axios
                .$delete("https://anadolu-vakfi.firebaseio.com/commonList/" +
                deletedCommon.id +
                ".json?auth="+ vuexContext.state.token, deletedCommon)
                .then(res => {
                    vuexContext.commit('deleteCommonItem', deletedCommon)
                })
                .catch(e => console.log(e))
            },
            /*
            addCommon({commit,state}, newCommon) {
                commit('setSuccess', false)
                commit('setBusy', true)
                return this.$axios
                .$post(
                    "https://anadolu-vakfi.firebaseio.com/commons.json?auth=" +state.token, newCommon)
                .then(data => {
                    commit('addCommon', {...newCommon, id: data.name, items: []})
                    commit('setBusy', false);
                    commit('setSuccess', true)
                })
                .catch(e => {
                    commit('setBusy', false)
                    commit('setError', e.response.data.error)
                    commit('setSuccess', false)
                });
            },*/
            loadCommonList({commit}){
                commit('setLoading', true)
                return this.$axios
                    .$get("/commonList.json")
                    .then(data => {
                        const commonsArray = [];
                        for(const key in data){
                            commonsArray.push({ ...data[key], id: key });
                        }
                        commit("setCommonList", commonsArray);
                        commit('setLoading', false);
                    })
                    .catch(e => {
                        commit('setLoading', false)
                        commit('setError', e.response.data.error)
                    });
            },
            loadCommonValues({commit}){
                commit('setLoading', true)
                return this.$axios
                    .$get("/commonValues.json")
                    .then(data => {
                        const commonValuesArray = [];
                        for(const key in data){
                            commonValuesArray.push({ ...data[key], id: key });
                        }
                        commit("setCommonValues", commonValuesArray);
                        commit('setLoading', false);
                    })
                    .catch(e => {
                        commit('setLoading', false)
                        commit('setError', e.response.data.error)
                    });
            },
            addCommonItems({commit,state}, newExcelRecord) {
                commit('setSuccess', false)
                commit('setBusy', true)
                newExcelRecord.itemList.forEach((item, index) => {
                    console.log("item: "+item[Object.keys(item)[0]])
                    const newItem = {
                        name : item[Object.keys(item)[0]],
                        value: newExcelRecord.value
                    }

                    return this.$axios
                    .$post(
                        "https://anadolu-vakfi.firebaseio.com/commonList.json?auth=" +state.token, newItem)
                        .then(data => {
                            commit('addCommonItem', {...newItem, id: data.name})
                            if(newExcelRecord.itemList.length === index + 1){
                                
                                commit('setSuccess', true)
                                commit('setBusy', false)
                            }

                        })
                        .catch(e => {
                            
                            commit('setError', e.response.data.error)
                            commit('setSuccess', false)
                            commit('setBusy', false)
                        });
                    
                    })
            },
            addCommonItem({commit,state}, newItem) {
                commit('setSuccess', false)
                commit('setBusy', true)
                return this.$axios
                .$post(
                    "https://anadolu-vakfi.firebaseio.com/commonList.json?auth=" +state.token, newItem)
                .then(data => {
                    commit('addCommonItem', {...newItem, id: data.name})
                    commit('setBusy', false);
                    commit('setSuccess', true)
                })
                .catch(e => {
                    commit('setBusy', false)
                    commit('setError', e.response.data.error)
                    commit('setSuccess', false)
                });
            },
            editCommonItem({commit, state}, editedCommon) {
                commit('setSuccess', false)
                commit('setBusy', true)
                console.log("edited common id : " +editedCommon.id)
                return this.$axios
                .$put("https://anadolu-vakfi.firebaseio.com/commonList/" +
                editedCommon.id +
                ".json?auth=" + state.token, editedCommon)
                .then(res => {
                    commit('editCommon', editedCommon)
                    commit('setBusy', false);
                    commit('setSuccess', true)
                })
                .catch(e => {                    
                    commit('setBusy', false)
                    commit('setError', e.response.data.error)
                    commit('setSuccess', false)
                })
            },
            /*
            editCommon({commit, state}, editedCommon) {
                commit('setSuccess', false)
                commit('setBusy', true)
                console.log("edited common id : " +editedCommon.id)
                return this.$axios
                .$put("https://anadolu-vakfi.firebaseio.com/commons/" +
                editedCommon.id +
                ".json?auth=" + state.token, editedCommon)
                .then(res => {
                    commit('editCommon', editedCommon)
                    commit('setSelectedCommon',editedCommon)
                    commit('setBusy', false);
                    commit('setSuccess', true)
                })
                .catch(e => {                    
                    commit('setBusy', false)
                    commit('setError', e.response.data.error)
                    commit('setSuccess', false)
                })
            },*/
            loadModuleCommons({commit}){
                commit('setLoading', true)
                return this.$axios
                    .$get("/moduleCommons.json")
                    .then(data => {
                        const itemsArray = [];
                        for(const key in data){
                            itemsArray.push({ ...data[key], id: key });
                        }
                        commit("setModuleCommons", itemsArray);
                        commit('setLoading', false);
                    })
                    .catch(e => {
                        commit('setLoading', false)
                        commit('setError', e.response.data.error)
                    });
            },
            addModuleCommons({commit, state}, modules){
                commit('setSuccess', false)
                commit('setBusy', true)
                console.log("addModuleCommons " +modules)
                modules.forEach(moduleItem => {

                    const commonModule = {
                        module : moduleItem,
                        commonItem : state.selectedCommon
                    }
                    if( ! state.moduleCommons.some(el =>  ( el.module.text === commonModule.module.text && el.commonItem.name === commonModule.commonItem.name ) ) ){
                        return this.$axios
                        .$post(
                            "https://anadolu-vakfi.firebaseio.com/moduleCommons.json?auth=" +state.token, commonModule)
                        .then(data => {
                            commit('addModuleCommon', {...commonModule, id: data.name})
                            commit('setBusy', false);
                            commit('setSuccess', true)
                        })
                        .catch(e => {
                            commit('setBusy', false)
                            commit('setError', e.response.data.error)
                            commit('setSuccess', false)
                        });
                    }
                });
            },
            clearError ({commit}) {
                commit('clearError')
            },
            clearSuccess ({commit}) {
                commit('clearSuccess')
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