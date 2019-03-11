<template>
  <div id="contents">
    <product-info :data="productData"/>
    <review-list :reviewData="reviewData" :reviewList="reviewData.review_list"/>
    <shop-map :addressData="addressData"/>
  </div>
</template>

<script>
import axios from 'axios'
import productInfo from '@/components/ShopInfo/productInfo.vue'
import ReviewList from '@/components/review/ReviewList.vue'
import ShopMap from '@/components/ShopInfo/ShopMap.vue'

export default {
    components: { ShopMap, productInfo, ReviewList },
    data() {
        return {
            id: this.$route.params._id,
            productData: '',
            reviewData: [],
            addressData: {},
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
                this.productData = res.data
                this.reviewData = res.data.review
                this.addressData = {
                    shop_address: res.data.shop_address,
                    shop_name: res.data.shop_name,
                }
            })
            .catch(err => {
                console.log(err)
            })
    },
}
</script>
