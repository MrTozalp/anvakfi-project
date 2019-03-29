import MemberModel from '@/static/model/Member'
export const namespaced = true

export const state = () => ({
    fileName: null,
    headers: [],
    selectedHeaders: [],
    tickets: [],
    model: [],
    selectedModel: []
})

export const getters = {
    isThereRecord: state => {
        return state.tickets.length > 0
    },
    getSelectedModelNotDep : state => {
        return state.selectedModel.find(item => !item.dependent)
    },
    getSelectedModelDependent : state => {
        return state.selectedModel.find(item => item.dependent && item.parent)
    },
    getSelectedModel : state => key => {
        return state.selectedModel.find(item=> item.key === key)
    },
    getUnselectedModel: state => {
        return state.model.filter(modelItem => {
            return state.selectedModel.every(selectedModelItem => {
                return selectedModelItem.key !== modelItem.key
            })
        })
    },
    getUnselectedHeaders: state => {
        return state.headers.filter(headerItem => {
            return state.selectedHeaders.every( selectedHeader => {
                return selectedHeader.value !== headerItem.value
            })
        })
    },
    getSelectedModelIsListed: state => {
        return state.selectedModel.filter( 
            selectedModelItem => selectedModelItem.isList 
        )
    }
}

export const mutations = {
    SET_FILE_NAME(state, fileName) {
        state.fileName = fileName
    },
    SET_HEADERS(state, headers) {
        state.headers = headers
    },
    SET_TICKETS(state, tickets) {
        state.tickets = tickets
    },
    SET_MODEL(state,model) {
        state.model = model
    },
    REMOVE_MODEL_ITEM(state, payload){
        state.selectedModel.splice(payload,1)
    },
    INSERT_MODEL_ITEM(state, payload) {
        state.selectedModel.push(payload)
    },
    REMOVE_HEADER_ITEM(state, payload){
        state.selectedHeaders.splice(payload,1)
    },
    INSERT_HEADER_ITEM(state, payload) {
        state.selectedHeaders.push(payload)
    },
    EDIT_TICKET_BY_ATTR(state, payload) {
        const itemForEdit = payload.ticketItem
        const editedItem = payload.editedItem
        Object.assign(itemForEdit, editedItem)

    }
}

export const actions = {
    reset({commit}){
        commit("SET_FILE_NAME", null)
        commit("SET_HEADERS", [])
        commit("SET_TICKETS", [])
        
    },
    initModel({commit}) {
        commit('SET_MODEL', MemberModel)
    },
    removeModelItem({commit}, payload) {
        commit('REMOVE_MODEL_ITEM', payload)
    },
    insertModelItem({commit}, payload) {
        commit('INSERT_MODEL_ITEM', payload)
    },
    removeHeaderItems({commit}, payloadList) {
        payloadList.forEach( payload => {
            commit('REMOVE_HEADER_ITEM', payload)
        })
    },
    insertHeaderItems({commit}, payloadList) {
        payloadList.forEach( payload => {
            commit('INSERT_HEADER_ITEM', payload)
        })
    }
    
}