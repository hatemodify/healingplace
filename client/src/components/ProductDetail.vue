<template>
  <div id="contents">
    <product-info :data="productData"></product-info>
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
import axios from "axios";
import productInfo from "./productInfo.vue";
import VueDaumMap from "vue-daum-map";

export default {
  components: { VueDaumMap, productInfo },
  data() {
    return {
      id: this.$route.params._id,
      productData: "",
      appKey: "eaf4c13b334e2ff65a4abdb939521573",
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
  beforeCreate() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      axios
        .get(
          `http://localhost:9998/product/productdetail/${vm.$route.params._id}`
        )
        .then(res => {
          vm._data.productData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
  watch: {
    productData: "addressSearch"
  },
  methods: {
    onLoad(map) {
      var bounds = map.getBounds();
      var boundsStr = bounds.toString();
      this.mapObject = map;
      this.geocoder = new daum.maps.services.Geocoder();
    },
    addressSearch(opt) {
      this.geocoder.addressSearch(opt.shop_address, (result, status) => {
        if (status === daum.maps.services.Status.OK) {
          var coords = new daum.maps.LatLng(result[0].y, result[0].x);

          var marker = new daum.maps.Marker({
            map: this.mapObject,
            position: coords
          });

          var infowindow = new daum.maps.InfoWindow({
            content: `<div style="width:100px;text-align:center;padding:3px">${
              opt.shop_name
            }</div>`
          });
          infowindow.open(this.mapObject, marker);

          this.mapObject.setCenter(coords);
        }
      });
    }
  }
};
</script>
