export const namespaced = true

export const state = () => ({
    groups: []

})

export const getters = {
    getGroupById: state => id => {
      return state.groups.find(group => group.id === id)
    },
    groupNamesOfGroups: state => groups => {
        let groupNames = ""
        
        for(const key in groups){
            const groupItem = state.groups.find(group => group.id === groups[key])
            groupNames += groupItem.groupName 
            if(groups.length -1 > key)
                groupNames += ', '
        }
        return groupNames
    },
    isBlackListGroup: state => groups=> {
        for(const key in groups){
            const groupItem = state.groups.find(group => group.id === groups[key])
            if(groupItem.isBlackList) return true
        }
        return false
    },
    getGroupByName (state) {
        return (groupName) => state.groups.find(group => group.groupName === groupName )
        
    },
}

export const mutations = {
    SET_GROUPS(state, groups) {
        state.groups = groups
    },
    ADD_GROUP(state, group) {
        state.groups.push(group)
    },
    EDIT_GROUP(state, editedGroup) {
        const groupIndex = state.groups.findIndex(
          group => group.id === editedGroup.id
        );
        state.groups[groupIndex] = editedGroup
    },
    DELETE_GROUP(state, deletedGroup) {
        const groupIndex = state.groups.findIndex(
            group => group.id === deletedGroup.id
        );
        state.groups.splice(groupIndex,1);
    }
}

export const actions = {
    loadGroups({commit, dispatch}) {
        dispatch('dataAction/init', 'group', { root: true })
        return this.$axios
        .$get("/groups.json")
        .then(data => {
            console.log('load groups '+ data)
            const groupsArray = [];
            for(const key in data){
                groupsArray.push({ ...data[key], id: key });
            }
            commit("SET_GROUPS", groupsArray)
            dispatch('dataAction/setLoaded', 'group', { root: true })
        })
        .catch(e => {
            context.error(e)
        });
    },
    addGroup({commit, rootGetters}, group) {

        const createdGroup = {
            ...group,
            createdDate: new Date()
        }
        return this.$axios
        .$post(
            "https://anadolu-vakfi.firebaseio.com/groups.json?auth=" +rootGetters['authentication/token'], createdGroup)
        .then(data => {
            commit('ADD_GROUP', {...createdGroup, id: data.name})
            dispatch('logActions/addActionLog', 
            {actionType: 'add', module: 'group'} , { root: true })
        })
        .catch(e => console.log(e));
    },
    editGroup({commit, dispatch, rootGetters}, group) {

        const editedGroup = {
            ...group,
            updatedDate: new Date()
        }
        return this.$axios
        .$put("https://anadolu-vakfi.firebaseio.com/groups/" +
        editedGroup.id +
        ".json?auth=" + rootGetters['authentication/token'], editedGroup)
        .then(res => {
            dispatch('logActions/addActionLog', 
            {actionType: 'edit', module: 'group'} , { root: true })
            commit('EDIT_GROUP', editedGroup)

        })
        .catch(e => console.log(e))
    },
    deleteGroup(vuexContext, deletedGroup) {
        return this.$axios
        .$delete("https://anadolu-vakfi.firebaseio.com/groups/" +
        deletedGroup.id +
        ".json?auth="+ vuexContext.rootGetters['authentication/token'], deletedGroup)
        .then(res => {
            vuexContext.commit('DELETE_GROUP', deletedGroup)
            dispatch('logActions/addActionLog', 
            {actionType: 'delete', module: 'group'} , { root: true })
        })
        .catch(e => console.log(e))
    }
}