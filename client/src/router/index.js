import Vue from 'vue'
import Router from 'vue-router'
import OwnerMain from '@/components/owner/index'
import Admin from '@/components/admin/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/owner',
      name:'OwnerMain',
      component:OwnerMain
    },
    {
      path:'/admin',
      name:'Admin',
      component:Admin
    }
  ]
})
