<template>
  <div id="app">
    <gnb></gnb>
    <router-view/>
  </div>
</template>

<style lang='scss'>
@import 'assets/css/reset.css';
@import 'assets/css/style.scss';
</style>

<script>
import { mapMutations } from 'vuex'
import gnb from '@/components/layout/Gnb'
import axios from 'axios'
export default {
    components: {
        gnb,
    },
    beforeMount() {
        const userInfo = {
            Eea: localStorage.Eea,
            userName: localStorage.userName,
        }
        this.geolocate()
        this.userLogin(userInfo)
        console.log(this.$route.fullPath)
    },
    methods: {
        geolocate() {
            if (window.navigator && window.navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    this.onGeolocateSuccess,
                    this.onGeolocateError
                )
            }
        },
        onGeolocateSuccess(coordinates) {
            const coords = {
                latitude: coordinates.coords.latitude,
                longitude: coordinates.coords.longitude,
            }
            this.myLocation(coords)
        },

        onGeolocateError(error) {
            console.warn(error.code, error.message)
            if (error.code === 1) {
                // they said no
            } else if (error.code === 2) {
                // position unavailable
            } else if (error.code === 3) {
                // timeout
            }
        },
        ...mapMutations(['myLocation']),
        ...mapMutations(['userLogin']),
    },
}
</script>
