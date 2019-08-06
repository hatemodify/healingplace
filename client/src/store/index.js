import Vue from 'vue'
import Vuex from 'vuex'
import shop from './shop'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shop
  },
  state: {
    currentPage: '',
    coordinates: '',
    userInfo: {},
    prevPath: ''
  },
  mutations: {
    changePage: (state, payload) => {
      return (state.currentPage = payload)
    },
    myLocation: (state, payload) => {
      return (state.coordinates = payload)
    },
    userLogin: (state, payload) => {
      return (state.userInfo = payload)
    },
    backPath: (state, payload) => {
      return (state.prevPath = payload)
    }
  },
  actions: {}
})
