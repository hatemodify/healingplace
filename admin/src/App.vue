<template>
  <div id="app">
    <site-nav></site-nav>
    <router-view/>
  </div>
</template>
<style lang="scss">
@import '../public/assets/admin/css/reset.css';
@import '../public/assets/admin/css/style_admin.scss';
</style>

<script>
import siteNav from '@/components/Navigation'
export default {
    components: {
        'site-nav': siteNav,
    },
}
</script>
