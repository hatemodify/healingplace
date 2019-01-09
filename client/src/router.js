import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('./views/main.vue')
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
