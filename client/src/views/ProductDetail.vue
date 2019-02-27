<template>
  <div id="contents">
    <product-info :data="productData"/>
    <review-list :reviewData="reviewData" :reviewList="reviewData.review_list"/>
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
    />
  </div>
</template>

<script>
import axios from 'axios'
import productInfo from '@/components/productInfo.vue'
import ReviewList from '@/components/review/ReviewList.vue'
import VueDaumMap from 'vue-daum-map'

export default {
    components: { VueDaumMap, productInfo, ReviewList },
    data() {
        return {
            id: this.$route.params._id,
            productData: '',
            reviewData: [],
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
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     axios
    //       .get(
    //         `https://dev.local.com:9998/product/productdetail/${vm.$route.params._id}`
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
                `https://dev.local.com:9998/product/productdetail/${
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
