import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('./views/Main.vue')
    },
    {
      path: '/around',
      name: 'Around',
      component: () => import('./views/Around.vue')
    },
    {
      path: '/around/map',
      name: 'Map',
      component: () => import('./views/Map.vue')
    },
    {
      path: '/shop/shopdetail/:_id',
      name: 'ShopDetail',
      props: true,
      component: () => import('./views/ShopDetail.vue')
    },
    {
      path: '/shop/shopList',
      name: 'shopList',
      component: () => import('./views/ShopList.vue')
    },
    {
      path: '/login',
      name: 'Login',
      props: true,
      component: () => import('./views/Login.vue')
    }
  ]
})
