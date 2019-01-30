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
        this.geo(this.getMyLocation)
    },
    methods: {
        geo(position) {
            navigator.geolocation.getCurrentPosition(position)
        },
        getMyLocation(position) {
            const coord = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }
            this.myLocation(coord)
        },

        ...mapMutations(['myLocation']),
    },
}
</script>
