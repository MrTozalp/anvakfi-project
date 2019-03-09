export const namespaced = true

export const state = () => ({
    members: [],
})

export const getters = {
    getMemberById: state => id => {
      return state.members.find(member => member.id === id)
    }
}

export const mutations = {
    SET_MEMBERS(state, members) {
        state.members = members
    },
    ADD_MEMBER(state, member) {
        state.members.push(member)
    },
    EDIT_MEMBER(state, editedMember) {
        const memberIndex = state.members.findIndex(
          member => member.id === editedMember.id
        );
        state.members[memberIndex] = editedMember
    },
    DELETE_MEMBER(state, deletedMember) {
        const memberIndex = state.members.findIndex(
            member => member.id === deletedMember.id
        );
        state.members.splice(memberIndex,1);
    }
}

export const actions = {
    loadMembers({commit, dispatch}) {
        dispatch('dataAction/init', 'member', { root: true })
        return this.$axios
            .$get("/members.json")
            .then(data => {
                console.log('load members '+ data)
                const membersArray = [];
                for(const key in data){
                    membersArray.push({ ...data[key], id: key });
                }
                commit("SET_MEMBERS", membersArray)
                dispatch('dataAction/setLoaded', 'member', { root: true })
            })
            .catch(e => {
                context.error(e)
            });
    },
    addMember({commit,rootState, rootGetters}, member) {
        const memberBranch = rootState.branch.branches.find(element => element.id == member.branch)
        const memberGender = rootState.commonInfo.commonList.find(element => element.id == member.gender)
        const memberOccupation = rootState.commonInfo.commonList.find(element => element.id == member.occupation)
        const memberHometown = rootState.commonInfo.commonList.find(element => element.id == member.hometown)
        const memberProvince = rootState.commonInfo.commonList.find(element => element.id == member.province)
        const memberDistrict = rootState.commonInfo.commonList.find(element => element.id == member.district)
        const groupNames = rootGetters['group/groupNamesOfGroups'](member.groups)

        const createdMember = {
            ...member,
            hometownName: memberHometown ? memberHometown.name : '',
            branchName: memberBranch ? memberBranch.branchName : '',
            genderName: memberGender ? memberGender.name : '',
            occupationName: memberOccupation ? memberOccupation.name : '',
            provinceName: memberProvince ? memberProvince.name : '',
            districtname: memberDistrict ? memberDistrict.name : '',
            groupNames: groupNames ? groupNames : '',
            createdDate: new Date()
        }
        return this.$axios
        .$post(
            "https://anadolu-vakfi.firebaseio.com/members.json?auth=" +rootGetters['authentication/token'], createdMember)
        .then(data => {
            commit('ADD_MEMBER', {...createdMember, id: data.name})
        })
        .catch(e => console.log(e));
    },
    editMember({commit,rootState, rootGetters}, member) {
        const memberBranch = rootState.branch.branches.find(element => element.id == member.branch)
        const memberGender = rootState.commonInfo.commonList.find(element => element.id == member.gender)
        const memberOccupation = rootState.commonInfo.commonList.find(element => element.id == member.occupation)
        const memberHometown = rootState.commonInfo.commonList.find(element => element.id == member.hometown)
        const memberProvince = rootState.commonInfo.commonList.find(element => element.id == member.province)
        const memberDistrict = rootState.commonInfo.commonList.find(element => element.id == member.district)
        const groupNames = rootGetters['group/groupNamesOfGroups'](member.groups)

        const editedMember = {
            ...member,
            hometownName: memberHometown ? memberHometown.name : '',
            branchName: memberBranch ? memberBranch.branchName : '',
            genderName: memberGender ? memberGender.name : '',
            occupationName: memberOccupation ? memberOccupation.name : '',
            provinceName: memberProvince ? memberProvince.name : '',
            districtname: memberDistrict ? memberDistrict.name : '',
            groupNames: groupNames ? groupNames : '',
            updatedDate: new Date()
        }
        return this.$axios
        .$put("https://anadolu-vakfi.firebaseio.com/members/" +
        editedMember.id +
        ".json?auth=" + rootGetters['authentication/token'], editedMember)
        .then(res => {
            commit('EDIT_MEMBER', editedMember)
        })
        .catch(e => console.log(e))
    },
    deleteMember(vuexContext, deletedMember) {
        return this.$axios
        .$delete("https://anadolu-vakfi.firebaseio.com/members/" +
        deletedMember.id +
        ".json?auth="+ vuexContext.rootGetters['authentication/token'], deletedMember)
        .then(res => {
            vuexContext.commit('DELETE_MEMBER', deletedMember)
        })
        .catch(e => console.log(e))
    }
}