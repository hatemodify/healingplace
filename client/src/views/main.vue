<template>
  <div id="wrap">
    <p>Lat = {{center.lat}} Lon ={{center.lng}}</p>
    <button @click="coordinates">aaa</button>
    <p>{{temp}}</p>
    <vue-daum-map
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      @load="markerr"
      style="width:500px;height:500px;"
    ></vue-daum-map>
    <button @click="aaaa">convert</button>
    <br>
    <button @click="near">near</button>
    {{addr}}
  </div>
</template>
<script>
import axios from "axios";
import VueDaumMap from "vue-daum-map";
export default {
  components: { VueDaumMap },
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
      addr: [],
      temp: ""
    };
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getMyLocation);
    } else {
      this.error = "Geolocation is not supported.";
    }
  },
  methods: {
    getMyLocation: function(position) {
      this.center.lat = position.coords.latitude;
      this.center.lng = position.coords.longitude;
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    },
    onLoad(map) {},

    coordinates() {
      axios.get("http://127.0.0.1:9998/dummy").then(res => {
        this.temp = res.data.temp;
      });
    },
    convert(query) {
      const appkey = "36b94e04f7eb04d98cf49baa6fa460d8";
      const config = {
        headers: {
          Authorization: `KakaoAK ${appkey}`
        }
      };
      axios
        .get(
          `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
            query
          )}`,
          config
        )
        .then(res => {
          console.log(res);
        });
    },
    aaaa() {
      console.log(this.temp);
      this.temp.forEach(element => {
        console.log(element);
        this.convert(element.shop_address);
      });
    },
    near() {
      const lat = this.latitude;
      const lng = this.longitude;
      const coord = {
        lat,
        lng
      };
      axios.get("http://127.0.0.1:9998/near").then(res => {
        console.log(res);
        res.data.forEach(item => {
          let a = {
            shopName: item.shop_name,
            latlng: new daum.maps.LatLng(
              item.location.coordinates[1],
              item.location.coordinates[0]
            )
          };
          this.addr.push(a);
        });
      });
    },
    markerr(map) {
      this.near();
      setTimeout(() => {
        this.mapObject = map;

        // var imageSrc =
        //   "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        // var aa = this.addr;
        // for (var i = 0; i < positions.length - 1; i++) {
        //   // 마커 이미지의 이미지 크기 입니다
        //   var imageSize = new daum.maps.Size(24, 35);

        //   // 마커 이미지를 생성합니다
        //   var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);

        //   var marker = new daum.maps.Marker({
        //     map: this.mapObject, // 마커를 표시할 지도
        //     title: aa[i].shopName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다.
        //     position: aa[i].latlng, // 마커를 표시할 위치
        //     image: markerImage // 마커 이미지
        //   });
        // }
        var imageSrc =
          "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        var imageSize = new daum.maps.Size(24, 35);
        var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);
        var marker = new daum.maps.Marker({
          map: this.mapObject, // 마커를 표시할 지도
          title: "", // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다.
          position: new daum.maps.LatLng(37.2939104,127.2025664),
          image: markerImage // 마커 이미지
        });
      }, 500);
    }
  }
};
</script>
