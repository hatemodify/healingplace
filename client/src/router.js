import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/prouctslist',
      name: 'ProductsList',
      component: () => import('./views/ProductsList.vue')
    },
    {
      path: '/productdetail/:id',
      name: 'ProductDetail',
      component: () => import('./views/ProductDetail.vue')
    }
  ]
});
