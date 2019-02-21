<template>
  <div>// Button to login
    <GoogleLogin :client_id="client_id" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin>// Button to logout
    <GoogleLogin :client_id="client_id" :logoutButton="true">Logout</GoogleLogin>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import GoogleLogin from 'vue-google-login'
import { LoaderPlugin } from 'vue-google-login'
import axios from 'axios'
export default {
    components: { GoogleLogin },
    data() {
        return {
            client_id:
                '629478743345-pto5adbsdrkcvtlbvehjq06qt2gvfln7.apps.googleusercontent.com',
        }
    },
    methods: {
        onSuccess(googleUser) {
            axios
                .post(
                    `http://dev.local.com:9998/user/loginProcess/`,
                    googleUser.getBasicProfile()
                )
                .then(res => {
                    this.userLogin(res.data.Eea)
                    localStorage.Eea = res.data.Eea
                    this.$router.push('/')
                })
        },
        onFailure(googleUser) {
            console.log(googleUser)
            console.log(googleUser.getBasicProfile())
        },
        ...mapMutations(['userLogin']),
    },
}
</script>
