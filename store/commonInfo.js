export const namespaced = true

export const state = () => ({
    commonList: [],
    commonValues: [],
    selectedCommon: null,
    selectedCommonItem: null
})

export const getters = {
    getCommonById (state) {
        return (id) => {
          return state.commonList.find((common) => {
            return common.id === id
          })
        }
    },
    getCommonByValue (state) {
        return (value) => {
          return state.commonList.filter((common) => {
            return common.value === value
          })
        }
    },
    getCommonByParent (state) {
        return (parentId) => {
            return state.commonList.filter((common) => {
                return common.parent === parentId
            })
        }
    },
    selectedCommon(state){
        return state.selectedCommon
    },
    selectedCommonItem(state){
        return state.selectedCommonItem
    },
    selectedCommonList(state){
        return state.commonList.filter((listItem) => {
            if(state.selectedCommon !== null && listItem.value !== state.selectedCommon.value){
                return false
            }

            if( state.selectedCommonItem !== null && state.selectedCommonItem.id !== listItem.parent){
                console.log('selectedCommonItem defined')
                return false
            }
                
            return true
        })
    },
    selectedCommonParentList(state){
        if(state.selectedCommon !== null && state.selectedCommon.parent !== 'undefined' && state.selectedCommon.parent !== null){
            return state.commonList.filter((listItem) => listItem.value === state.selectedCommon.parent)
            
        }
        else return []
    }
}

export const mutations = {
    SET_COMMON_LIST(state, commonList) {
        state.commonList = commonList
    },
    SET_COMMON_VALUES(state, commonValues){
        state.commonValues = commonValues
    },
    EDIT_COMMON_ITEM(state, editedCommon) {
        let itemToUpdate = state.commonList.find(
          common => common.id == editedCommon.id
        );
        Object.assign(itemToUpdate,editedCommon)
    },
    DELETE_COMMON_ITEM(state, deletedCommon) {
        const index = state.commonList.findIndex(
            common => common.id === deletedCommon.id
        );
        state.commonList.splice(index,1);
    },
    ADD_COMMON_ITEM(state, newItem) {
        state.commonList.push(newItem)
    },
    SET_SELECTED_COMMON(state, common){
        state.selectedCommon = common
        state.selectedCommonItem = null
    },
    SET_SELECTED_COMMON_ITEM(state, commonItem){
        state.selectedCommonItem = commonItem
    },
    SET_SELECTED_COMMON_LIST(state){
        console.log("selected common list : "+state.selectedCommon)
        state.selectedCommonList = state.commonList.filter((listItem) => {
            return listItem.value === state.selectedCommon
        });
    }
    
}


export const actions = {
    resetSelectedCommon({commit}){
        commit('SET_SELECTED_COMMON', null)
    },
    loadCommonList({commit, dispatch}){
        dispatch('dataAction/init', 'commonList', { root: true })
        return this.$axios
            .$get("/commonList.json")
            .then(data => {
                const commonsArray = [];
                for(const key in data){
                    commonsArray.push({ ...data[key], id: key });
                }
                commit("SET_COMMON_LIST", commonsArray);
                dispatch('dataAction/setLoaded', 'commonList', { root: true })
            })
            .catch(e => {
                dispatch('dataAction/setLoading', false,  { root: true })                
                dispatch('dataAction/setError', error.response.data.error,  { root: true })
            });
    },
    loadCommonValues({commit, dispatch}){
        dispatch('dataAction/init', 'commonValues', { root: true })
        return this.$axios
            .$get("/commonValues.json")
            .then(data => {
                const commonValuesArray = [];
                for(const key in data){
                    commonValuesArray.push({ ...data[key], id: key });
                }
                commit("SET_COMMON_VALUES", commonValuesArray);
                dispatch('dataAction/setLoaded', 'commonValues', { root: true })
            })
            .catch(e => {
                dispatch('dataAction/setLoading', false,  { root: true })                
                dispatch('dataAction/setError', error.response.data.error,  { root: true })
            });
    },
    deleteCommonItem(vuexContext, deletedCommon) {
        return this.$axios
        .$delete("https://anadolu-vakfi.firebaseio.com/commonList/" +
        deletedCommon.id +
        ".json?auth="+ vuexContext.rootGetters['authentication/token'], deletedCommon)
        .then(res => {
            vuexContext.commit('DELETE_COMMON_ITEM', deletedCommon)
        })
        .catch(e => console.log(e))
    },
    addCommonItems({commit, dispatch, rootGetters}, newExcelRecord) {
        dispatch('dataAction/setSuccess', false, { root: true })
        dispatch('dataAction/setBusy', true, { root: true })
        newExcelRecord.itemList.forEach((item, index) => {
            console.log("item: "+item[Object.keys(item)[0]])
            const newItem = {
                name : item[Object.keys(item)[0]],
                value: newExcelRecord.value
            }

            return this.$axios
            .$post(
                "https://anadolu-vakfi.firebaseio.com/commonList.json?auth=" +rootGetters['authentication/token'], newItem)
                .then(data => {
                    commit('ADD_COMMON_ITEM', {...newItem, id: data.name})
                    if(newExcelRecord.itemList.length === index + 1){
                        
                        dispatch('dataAction/setSuccess', true, { root: true })
                        dispatch('dataAction/setBusy', false, { root: true })
                    }

                })
                .catch(e => {
                    
                    dispatch('dataAction/setError', e.response.data.error, { root: true })
                    dispatch('dataAction/setSuccess', false, { root: true })
                    dispatch('dataAction/setBusy', false, { root: true })
                });
            
            })
    },
    addCommonItem({commit, dispatch,rootGetters}, newItem) {
        dispatch('dataAction/setSuccess', false, { root: true })
        dispatch('dataAction/setBusy', true, { root: true })
        console.log('token '+rootGetters['authentication/token'])
        return this.$axios
        .$post(
            "https://anadolu-vakfi.firebaseio.com/commonList.json?auth=" +rootGetters['authentication/token'], newItem)
        .then(data => {
            commit('ADD_COMMON_ITEM', {...newItem, id: data.name})
            dispatch('dataAction/setBusy', false, { root: true });
            dispatch('dataAction/setSuccess', true, { root: true })
        })
        .catch(e => {
            dispatch('dataAction/setBusy', false, { root: true })
            dispatch('dataAction/setError', e.response.data.error, { root: true })
            dispatch('dataAction/setSuccess', false, { root: true })
        });
    },
    editCommonItem({commit, dispatch,rootGetters}, editedCommon) {
        dispatch('dataAction/setSuccess', false, { root: true })
        dispatch('dataAction/setBusy', true, { root: true })
        console.log("edited common id : " +editedCommon.id)
        return this.$axios
        .$put("https://anadolu-vakfi.firebaseio.com/commonList/" +
        editedCommon.id +
        ".json?auth=" + rootGetters['authentication/token'], editedCommon)
        .then(res => {
            commit('EDIT_COMMON_ITEM', editedCommon)
            dispatch('dataAction/setBusy', false, { root: true });
            dispatch('dataAction/setSuccess', true, { root: true })
        })
        .catch(e => {                    
            dispatch('dataAction/setBusy', false, { root: true })
            dispatch('dataAction/setError', e.response.data.error, { root: true })
            dispatch('dataAction/setSuccess', false, { root: true })
        })
    },

}