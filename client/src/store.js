import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: '',
    coordinates: '',
    Eea: ''
  },
  mutations: {
    changePage: (state, payload) => {
      return (state.currentPage = payload)
    },
    myLocation: (state, payload) => {
      return (state.coordinates = payload)
    },
    userLogin: (state, paload) => {
      return (state.Eea = paload)
    }
  },
  actions: {}
})
