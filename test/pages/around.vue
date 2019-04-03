<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      coords: {}
    }
  },
  created() {
    this.geolocate()
    console.log(this.coords)
  },
  methods: {
    geolocate() {
      navigator.geolocation.getCurrentPosition(
        this.onGeolocateSuccess,
        this.onGeolocateError
      )
    },
    onGeolocateSuccess(coordinates) {
      const coords = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude
      }
      this.coords = coords
    },

    onGeolocateError(error) {
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
