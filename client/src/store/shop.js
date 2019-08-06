import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import shopApi from '@/api/shopApi'

Vue.use(Vuex)

const state = {
  shopList: [],
  shopDetail: {}
}

const mutations = {
  setShopDetail (state, paylaod) {
    state.shopDetail = paylaod
  }
}
const getters = {
  shopDetailData: state => state.shopDetail
}

const actions = {
  async getShopDetail ({ commit }, shopId) {
    const { data } = await axios.get(shopApi.getShopDetailApi(shopId))
    commit('setShopDetail', data)
  }
}

const namespaced = true
export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
