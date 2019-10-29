import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('@/views/Main')
    },
    {
      path: '/around',
      name: 'Around',
      component: () => import('@/views/shop/Around'),
      beforeEnter (to, from, next) {
        store.dispatch('shop/getShopList', store.getters.getCoordinates)
        next()
      }
    },
    {
      path: '/around/map',
      name: 'Map',
      component: () => import('@/views/shop/Map')
    },
    {
      path: '/shop/shopdetail/:_id',
      name: 'ShopDetail',
      props: true,
      component: () => import('@/views/shop/ShopDetail')
    },
    // {
    //   path: '/shop/shopList',
    //   name: 'ShopList',
    //   component: () => import('@/views/shop/ShopList')
    // },
    {
      path: '/login',
      name: 'Login',
      props: true,
      component: () => import('@/views/user/Login')
    }
  ]
})
