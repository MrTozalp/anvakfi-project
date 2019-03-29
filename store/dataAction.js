export const namespaced = true

export const state = () => ({
    loading: false,
    loadingHolders: [],
    busy: false,
    error: null,
    success: false,
})

export const getters = {
    getMemberById: state => id => {
      return state.members.find(member => member.id === id)
    },
    isDataLoading: state => {
        return state.loadingHolders === 'undefined' || state.loadingHolders.length === 0 || state.loadingHolders.some(loadingHolder => loadingHolder.value === false)
    }
}


export const mutations = {
    SET_LOADING(state, isLoaded) {
        state.loading = isLoaded
    },
    INIT_DATA_LOADING(state, key) {
        const loadingHolder = state.loadingHolders.find(
            loadingHolder => loadingHolder.key === key
        );
        if(loadingHolder) loadingHolder.value = false
        else{
            state.loadingHolders.push(
                {
                    key: key,
                    value: false
                }
            )
        }
    },
    SET_DATA_LOADED(state, key) {
        const loadingHolder = state.loadingHolders.find(
            loadingHolder => loadingHolder.key === key
        );
        loadingHolder.value = true
        
    },
    SET_BUSY(state, payload) {
        state.busy = payload
    },
    SET_ERROR (state, payload) {
        state.error = payload
    },
    SET_SUCCESS (state, payload) {
        state.success = payload
    },
    CLEAR_SUCCESS (state) {
        state.success = false
    },
    CLEAR_ERROR (state) {
        state.error = null
    },
    RESET_HOLDERS (state) {
        state.loadingHolders = []
    }
}

export const actions = {
    init({ commit, state }, dataToInit) {
        console.log('INIT!! '+dataToInit)
        if(!state.loading){
            commit('SET_LOADING',true)
        }
        commit('INIT_DATA_LOADING', dataToInit)
    },
    setLoaded({commit, getters}, dataToSetLoaded) {
        commit('SET_DATA_LOADED', dataToSetLoaded)
        if(!getters.isDataLoading){
            commit('RESET_HOLDERS')
            commit('SET_LOADING',false)
        }
    },
    setBusy({commit}, busy) {
        commit('SET_BUSY', busy)
    },
    setSuccess({commit}, success) {
        commit('SET_SUCCESS', success)
    },
    setError({commit}, error) {
        commit('SET_ERROR', error)
    },
    clearError({commit}) {
        commit('CLEAR_ERROR')
    },
    setLoading({commit}, loading) {
        console.log('setLoading')
        commit('SET_LOADING', loading)
    },
    resetHolders({commit}){
        commit('RESET_HOLDERS')
    },
    clearSuccess ({commit}) {
        commit('CLEAR_SUCCESS')
    }
  }