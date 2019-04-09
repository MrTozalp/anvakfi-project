export const namespaced = true

export const state = () => ({
    actions: []

})

export const mutations = {
    ADD_LOG(state, newLog) {
        state.actions.push(newLog)
    },
    SET_LOGS(state, actionLogs){
        state.actions = actionLogs
    },
    DELETE_LOG(state, deletedLog) {
        const logIndex = state.actions.findIndex(
            logItem => logItem.id === deletedLog.id
        );
        state.actions.splice(logIndex,1);
    }
}


export const actions = {
    loadActionLog({commit, dispatch}){
        dispatch('dataAction/init', 'logs', { root: true })
        return this.$axios
        .$get("/actionLogs.json")
        .then(data => {
            const logsArray = [];
            for(const key in data){
                logsArray.push({ ...data[key], id: key });
            }
            commit("SET_LOGS", logsArray)
            dispatch('dataAction/setLoaded', 'logs', { root: true })
        })
        .catch(e => {
            context.error(e)
        });
    },
    deleteActionLog({commit, rootGetters}, logItem){
        return this.$axios
        .$delete("https://anadolu-vakfi.firebaseio.com/actionLogs/" +
        logItem.id +
        ".json?auth="+ rootGetters['authentication/token'], logItem)
        .then(res => {
           commit('DELETE_LOG', logItem)
        })
        .catch(e => console.log(e))
    },
    addActionLog({commit, rootState,rootGetters}, createdLog){
        let actionLog = {
            user: rootState.authentication.userEmail,
            time: new Date(),
            ...createdLog
        }
        return this.$axios
        .$post("https://anadolu-vakfi.firebaseio.com/actionLogs.json?auth=" 
        + rootGetters['authentication/token'], actionLog)
        .then(data => {
            commit('ADD_LOG', {...actionLog, id: data.name})
        })
    }
}