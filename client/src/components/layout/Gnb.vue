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
      <template v-if="!this.$store.state.userInfo.Eea">
        <div class="wrap_util">
          <router-link to="/mypage" class="link_util">회원가입</router-link>
          <GoogleLogin
            :client_id="CLIENT_ID"
            :onSuccess="chkUser"
            :onFailure="loginFail"
            class="link_util"
          >로그인</GoogleLogin>
        </div>
      </template>
      <template v-else>
        <div class="wrap_util">
          <GnbCart/>
          <router-link to class="link_util">마이페이지</router-link>
          <a href="javascript:;" class="link_util" @click="logout">로그아웃</a>
        </div>
      </template>
    </div>
  </header>
</template>
<script>
import { mapMutations } from 'vuex'
import { CLIENT_ID } from '@/utils/constants'
import GoogleLogin from 'vue-google-login'
// import { LoaderPlugin } from 'vue-google-login'
import GnbCart from '@/components/GnbCart'
import axios from 'axios'

export default {
    components: { GnbCart, GoogleLogin },
    data() {
        return {
            current: this.$store.currentPage,
            active: false,
            loginState: this.$store.state.Eea,
            fullpath: this.$route.fullPath,
            CLIENT_ID: CLIENT_ID,
        }
    },

    methods: {
        chkUser(googleUser) {
            axios
                .post(
                    `https://dev.local.com:9998/user/loginProcess/`,
                    googleUser.getBasicProfile()
                )
                .then(res => {
                    res.data
                        ? this.loginSuccess(res)
                        : this.$router.push('/join')
                    // this.$router.go(this.$router.currentRoute)
                })
                .catch(err => {
                    return err
                })
        },
        loginFail(googleUser) {
            return googleUser.getBasicProfile()
        },
        logout() {
            this.userLogin({})
            sessionStorage.clear()
        },
        loginSuccess(res) {
            const userInfo = res.data.userInfo
            this.userLogin(userInfo)
            sessionStorage.setItem('Eea', userInfo.Eea)
            sessionStorage.setItem('userName', userInfo.userName)
        },
        ...mapMutations(['changePage']),
        ...mapMutations(['userLogin']),
    },
}
</script>
