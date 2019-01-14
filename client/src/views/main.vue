<template>
  <div id="wrap">
    <p>Lat = {{lat}} Lon ={{lon}}</p>
    <p>{{error}}</p>
    <button @click="myFunction()">Click Me</button>
    <vue-daum-map
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      @load="onLoad"
      style="width:500px;height:500px;"
    ></vue-daum-map>
  </div>
</template>
<script>
import axios from 'axios'
import VueDaumMap from "vue-daum-map"
export default {
  components:{VueDaumMap},
  data() {
    return {
      error: "",
      lat: "",
      lon: "",
      appKey: "002bf88c10aa0bca45e14a686a0f2b60",
      level: 3,
      mapTypeId: VueDaumMap.MapTypeId.NORMAL,
      libraries: ["services", "clusterer", "drawing"],
      mapObject: null,
      latitude: "",
      longitude: "",
      center: { lat: "", lng: "" },
      geocoder: "",
      addr: []
    };
  },
  created() {
    if (!navigator.geolocation) {
      console.log(`용자의 브라우저는 지오로케이션을 지원하지 않습니다.`);
      return;
    }

    axios.get(`http://ipinfo.io`).then(res =>{
      console.log(res.data);
    })
    this.myFunction()
  },
  methods: {
    myFunction: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        this.error = "Geolocation is not supported.";
      }
    },
    showPosition: function(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    },
    onLoad(map) {
      const bounds = map.getBounds();
      const boundsStr = bounds.toString();
      this.mapObject = map;
      this.geocoder = new daum.maps.services.Geocoder();
    },
    addressSearch(opt) {
      this.geocoder.addressSearch(
        opt.shop_info.shop_address,
        (result, status) => {
          if (status === daum.maps.services.Status.OK) {
            const coords = new daum.maps.LatLng(result[0].y, result[0].x);

            const marker = new daum.maps.Marker({
              map: this.mapObject,
              position: coords
            });

            const infowindow = new daum.maps.InfoWindow({
              content: `<div style='width:100px;text-align:center;padding:3px'>${
                opt.shop_info.shop_name
              }</div>`
            });
            infowindow.open(this.mapObject, marker);

            this.mapObject.setCenter(coords);
          }
        }
      );
    }
  }
};
</script>
