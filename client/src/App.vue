<template>
  <div id="app">
    <gnb></gnb>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "assets/css/reset.css";
@import "assets/css/style.scss";
</style>

<script>
import gnb from "@/components/layout/Gnb";
export default {
  components: {
    gnb
  }
};
</script>
