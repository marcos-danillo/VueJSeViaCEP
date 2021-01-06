export default {
    state: {
        clean: false,
        desserts: [],
    },
    mutations: {
        statusClean(state, payload){
            state.clean = payload
        },
        setDesserts(state, payload){
            state.desserts = payload
        },
    },
    actions: {
        setstatusClean({ commit }, payload){
            commit('statusClean', payload)
        },
        setstatusDesserts({ commit }, payload){
            commit('setDesserts', payload)
        },
    },
    getters: {
        getstatusClean(state){
            return state.clean
        },
        ceps(state){
            return state.desserts
        },
  }
}