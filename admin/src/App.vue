<template>  
  <div id="app">  
    <siteNav></siteNav>  
      <router-view/>
  </div>
</template>

<script>
import siteNav from '@/components/common/shop/Navigation';
export default {
  name: 'App',
  components: {
    siteNav
  }
};
</script>

<style lang="scss">
@import '/assets/admin/css/reset.css';
@import '/assets/admin/css/style_admin.scss';
</style>
