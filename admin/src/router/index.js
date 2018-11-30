import Vue from 'vue';
import Router from 'vue-router';
// import OwnerMain from '@/components/owner/index'
import Admin from '@/components/shop/index';
import AddShop from '@/components/shop/AddShop';
import AddProduct from '@/components/shop/AddProduct';
import ShopLogin from '@/components/shop/Login';

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
    },
    {
      path: '/shop/Login',
      name: 'ShopLogin',
      component: ShopLogin
    },
    {
      path: '/shop/AddProduct',
      name: 'AddProduct',
      component: AddProduct
    },
  ]
});
