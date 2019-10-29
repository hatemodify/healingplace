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
  },
  setShopList (state, paylaod) {
    state.shopList = paylaod
  }
}
const getters = {
  shopList: state => state.shopList,
  shopDetailData: state => state.shopDetail
}

const actions = {
  async getShopDetail ({ commit }, shopId) {
    const { data } = await axios.get(shopApi.getShopDetailApi(shopId))
    commit('setShopDetail', data)
  },
  async getShopList ({ commit }, { latitude, longitude }) {
    const { data } = await axios.get(
      shopApi.aroundShop({ latitude, longitude })
    )
    commit('setShopList', data)
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
