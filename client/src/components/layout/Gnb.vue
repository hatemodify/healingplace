<template>
  <header id="site_header">
    <div class="header_inner">
      <h1 class="site_logo">
        <router-link to="/">
          <img src="@/assets/images/logo.png" widt="100" alt>
        </router-link>
      </h1>
      <nav class="site_menu">
        <ul class="list_menu" ref="gnb" id="gnb">
          <li ref="around" @click="changePage('arround')">
            <router-link to="/around" active-class="active">내주변</router-link>
          </li>
          <li ref="local" @click="changePage('local')">
            <router-link to="/local" exact-active-class="exact-active">지역</router-link>
          </li>
          <li ref="promotion" @click="changePage('promotion')">
            <router-link to="/promotion">기획전</router-link>
          </li>
        </ul>
      </nav>
      <div class="wrap_search">
        <button class="btn_search"></button>
      </div>
      <div class="wrap_util">
        <router-link to class="link_util">회원가입</router-link>
        <router-link to class="link_util">로그인</router-link>
      </div>
    </div>
  </header>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            current: this.$store.currentPage,
            active: false,
        }
    },
    methods: {
        ...mapMutations(['changePage']),
    },
}
</script>
