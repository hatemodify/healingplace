import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: '',
    coords: ''
  },
  mutations: {
    changePage: (state, payload) => {
      return (state.currentPage = payload)
    },
    myLocation: (state, payload) => {
      return (state.coords = payload)
    }
  },
  actions: {}
})
