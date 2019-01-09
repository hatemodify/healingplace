<template>
  <div id="wrap">
    <p>Lat = {{lat}} Lon ={{lon}}</p>
    <p>{{error}}</p>
    <button @click="myFunction()">Click Me</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      error: "",
      lat: "",
      lon: ""
    };
  },
  created() {
    if (!navigator.geolocation) {
      console.log(`용자의 브라우저는 지오로케이션을 지원하지 않습니다.`);
      return;
    }
  },
  methods: {
    myFunction: function() {
      console.log("asdasd");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        this.error = "Geolocation is not supported.";
      }
    },
    showPosition: function(position) {
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
    }
  }
};
</script>
