// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// const store = () => {
//   new Vuex.Store({
//     state: {
//       currentPage: '',
//       coordinates: '',
//       userInfo: {},
//       prevPath: ''
//     },
//     mutations: {
//       changePage: (state, payload) => {
//         return (state.currentPage = payload)
//       },
//       myLocation: (state, payload) => {
//         return (state.coordinates = payload)
//       },
//       userLogin: (state, payload) => {
//         return (state.userInfo = payload)
//       },
//       backPath: (state, payload) => {
//         return (state.prevPath = payload)
//       }
//     },
//     actions: {}
//   })
// }

import Vuex from 'vuex'

const store = () =>
  new Vuex.Store({
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
    }
  })

export default store
