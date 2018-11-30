import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import ProductsList from '@/components/ProductsList';
import ProductDetail from '@/components/ProductDetail';

Vue.use(Router);
history;
export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      name:'Index',
      component:Index
    },
    {
      path: '/productslist',
      name: 'ProductsList',
      component: ProductsList
    },
    {
      path: '/productdetail/:_id',
      name: 'ProductDetail',
      component: ProductDetail
    }    
  ]
});
