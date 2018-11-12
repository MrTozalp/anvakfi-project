import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
    return new Vuex.Store({
        state: {
            members: []
        },
        getters: {
            loadedMembers(state) {
                return state.members;
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
            }
        },
        actions: {
            nuxtServerInit(vuexContext,context) {
                return axios
                    .get("https://anadolu-vakfi.firebaseio.com/members.json")
                    .then(res => {
                        const membersArray = [];
                        for(const key in res.data){
                            membersArray.push({ ...res.data[key], id: key });
                        }
                        vuexContext.commit("setMembers", membersArray);
                    })
                    .catch(e => context.error(e));
            },
            addMember(vuexContext, member) {
                const createdMember = {
                    ...member,
                    updatedDate: new Date()
                }
                return axios
                .post("https://anadolu-vakfi.firebaseio.com/members.json", createdMember)
                .then(result => {
                    vuexContext.commit('addMember', {...createdMember, id: result.data.name})
                })
                .catch(e => console.log(e));
            },
            editMember(vuexContext, editedMember) {
                return axios.put("https://anadolu-vakfi.firebaseio.com/members/" +
                editedMember.id +
                ".json", editedMember)
                .then(res => {
                    vuexContext.commit('editMember', editedMember)
                })
                .catch(e => console.log(e))
            },
            deleteMember(vuexContext, deletedMember) {
                return axios.delete("https://anadolu-vakfi.firebaseio.com/members/" +
                deletedMember.id +
                ".json", deletedMember)
                .then(res => {
                    vuexContext.commit('deleteMember', deletedMember)
                })
                .catch(e => console.log(e))
            }
        }
    });
};

export default createStore;