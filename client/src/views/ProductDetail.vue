<template>
  <div id="contents">
    <product-info :data="productData"></product-info>
    <product-review :data="reviewData"></product-review>
    <input type="date" ref="reserveDate">
    <input type="time" ref="reserveTime">
    <vue-daum-map
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      @load="onLoad"
      style="width:100%;height:500px;"
    ></vue-daum-map>
  </div>
</template>

<script>
import axios from 'axios'
import utils from '@/utils.js'
import productInfo from '@/components/productInfo.vue'
import ProductReview from '@/components/ProductReview.vue'
import VueDaumMap from 'vue-daum-map'

export default {
    components: { VueDaumMap, productInfo, ProductReview },
    data() {
        return {
            id: this.$route.params._id,
            productData: '',
            reviewData: '',
            appKey: '002bf88c10aa0bca45e14a686a0f2b60',
            level: 3,
            mapTypeId: VueDaumMap.MapTypeId.NORMAL,
            libraries: ['services', 'clusterer', 'drawing'],
            mapObject: null,
            latitude: '',
            longitude: '',
            center: { lat: '', lng: '' },
            geocoder: '',
            addr: [],
        }
    },
    beforeCreate() {},
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     axios
    //       .get(
    //         `http://localhost:9998/product/productdetail/${vm.$route.params._id}`
    //       )
    //       .then(res => {
    //         console.log(res);
    //         const data = res.data;
    //         const vmData = vm._data;
    //         vmData.productData = data;
    //         vmData.reviewData = data.review.review_list
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   });
    // },
    created() {
        axios
            .get(
                `http://localhost:9998/product/productdetail/${
                    this.$route.params._id
                }`
            )
            .then(res => {
                console.log(res)
                this.productData = res.data
                this.reviewData = res.data.review
            })
            .catch(err => {
                console.log(err)
            })
    },
    watch: {
        productData: 'addressSearch',
    },
    updated() {},
    methods: {
        onLoad(map) {
            const bounds = map.getBounds()
            const boundsStr = bounds.toString()
            this.mapObject = map
            this.geocoder = new daum.maps.services.Geocoder()
        },
        addressSearch(opt) {
            this.geocoder.addressSearch(opt.shop_address, (result, status) => {
                if (status === daum.maps.services.Status.OK) {
                    const coords = new daum.maps.LatLng(
                        result[0].y,
                        result[0].x
                    )
                    console.log(coords)
                    const marker = new daum.maps.Marker({
                        map: this.mapObject,
                        position: coords,
                    })

                    const infowindow = new daum.maps.InfoWindow({
                        content: `<div style='width:100px;text-align:center;padding:3px'>${
                            opt.shop_name
                        }</div>`,
                    })
                    infowindow.open(this.mapObject, marker)

                    this.mapObject.setCenter(coords)
                }
            })
        },
    },
}
</script>
