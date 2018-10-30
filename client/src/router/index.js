import Vue from 'vue';
import Router from 'vue-router';
// import OwnerMain from '@/components/owner/index'
import Admin from '@/components/shop/index';
import AddShop from '@/components/shop/AddShop';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/shop',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/shop/addshop',
      name: 'AddShop',
      component: AddShop
    }
  ]
});
