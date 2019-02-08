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
      path: '/productslist',
      name: 'ProductsList',
      component: () => import('./views/ProductsList.vue')
    },
    {
      path: '/productdetail/:_id',
      name: 'ProductDetail',
      props: true,
      component: () => import('./views/ProductDetail.vue')
    }
  ]
})
