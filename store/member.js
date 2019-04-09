export const namespaced = true

export const state = () => ({
    members: [],
    memberProperties: []
})

export const getters = {
    getMemberList: state => isBlack => {
        console.log('get member list: '+isBlack)
        return state.members.filter(member => {
            if(isBlack && !member.isBlackListGroup)
                return false
            if(!isBlack && member.isBlackListGroup)
                return false
            return true
            
        })
    },
    getMemberById: state => id => {
      return state.members.find(member => member.id === id)
    },
    getMemberProperties: state => {
        if(state.members.length > 0)
            return Object.getOwnPropertyNames(state.members[0])
        return null
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
    ,
    DELETE_ALL_MEMBERS(state) {
        state.members = []
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

    addMemberItems({dispatch}, excelRecords){
        dispatch('dataAction/setSuccess', false, { root: true })
        dispatch('dataAction/setBusy', true, { root: true })
        excelRecords.forEach( recordItem => {
            dispatch('addMember', recordItem).then( ()=>{
                if(excelRecords.length === index + 1){
                    dispatch('dataAction/setSuccess', true, { root: true })
                    dispatch('dataAction/setBusy', false, { root: true })
                }
            })
        })

    },
    addMember({commit,dispatch,rootState, rootGetters}, member) {
        const memberBranch = rootState.branch.branches.find(element => element.id == member.branch)
        const memberGender = rootState.commonInfo.commonList.find(element => element.id == member.gender)
        const memberOccupation = rootState.commonInfo.commonList.find(element => element.id == member.occupation)
        const memberHometown = rootState.commonInfo.commonList.find(element => element.id == member.hometown)
        const memberProvince = rootState.commonInfo.commonList.find(element => element.id == member.province)
        const memberDistrict = rootState.commonInfo.commonList.find(element => element.id == member.district)
        const isBlackListGroup = rootGetters['group/isBlackListGroup'](member.groups)
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
            isBlackListGroup: isBlackListGroup,
            createdDate: new Date()
        }
        return this.$axios
        .$post(
            "https://anadolu-vakfi.firebaseio.com/members.json?auth=" +rootGetters['authentication/token'], createdMember)
        .then(data => {
            commit('ADD_MEMBER', {...createdMember, id: data.name})
            dispatch('logActions/addActionLog', {actionType: 'add', module: 'member'},{ root: true })
        })
        .catch(e => console.log(e));
    },
    editMember({commit,dispatch,rootState, rootGetters}, member) {
        const memberBranch = rootState.branch.branches.find(element => element.id == member.branch)
        const memberGender = rootState.commonInfo.commonList.find(element => element.id == member.gender)
        const memberOccupation = rootState.commonInfo.commonList.find(element => element.id == member.occupation)
        const memberHometown = rootState.commonInfo.commonList.find(element => element.id == member.hometown)
        const memberProvince = rootState.commonInfo.commonList.find(element => element.id == member.province)
        const memberDistrict = rootState.commonInfo.commonList.find(element => element.id == member.district)
        const isBlackListGroup = rootGetters['group/isBlackListGroup'](member.groups)
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
            isBlackListGroup: isBlackListGroup,
            updatedDate: new Date()
        }
        return this.$axios
        .$put("https://anadolu-vakfi.firebaseio.com/members/" +
        editedMember.id +
        ".json?auth=" + rootGetters['authentication/token'], editedMember)
        .then(res => {
            commit('EDIT_MEMBER', editedMember)
            dispatch('logActions/addActionLog', {actionType: 'edit', module: 'member'},{ root: true })
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
            vuexContext.dispatch('logActions/addActionLog', {actionType: 'delete', module: 'member'},{ root: true })
        })
        .catch(e => console.log(e))
    },
    deleteAllMembers({commit,rootGetters}){
        return this.$axios
        .$delete("https://anadolu-vakfi.firebaseio.com/members.json?auth="+ rootGetters['authentication/token'])
        .then(res => {
            commit('DELETE_ALL_MEMBERS')
        })
    }
}