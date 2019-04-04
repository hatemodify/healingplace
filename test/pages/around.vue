<template>
  <div>{{coords}}</div>
</template>

<script>
export default {
  data() {
    return { coords: '' }
  },
  asyncData(context) {},
  beforeMount() {
    this.geolocate()
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
    }
  }
}
</script>
