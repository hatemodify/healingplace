<template>
  <div id="wrap">
    <gnb/>
    <nuxt/>
  </div>
</template>

<style lang='scss'>
@import '@/assets/scss/reset.scss';
@import '@/assets/scss/style.scss';
</style>
<script>
import Gnb from './Gnb'
import { mapMutations } from 'vuex'
export default {
  components: {
    Gnb
  },
  beforeMount() {
    const userInfo = {
      Eea: sessionStorage.Eea,
      userName: sessionStorage.userName
    }
    this.geolocate()
    this.userLogin(userInfo)
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
        longitude: coordinates.coords.longitude
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
    ...mapMutations(['userLogin'])
  }
}
</script>
