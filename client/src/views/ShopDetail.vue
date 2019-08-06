<template>
  <div id="contents">
    <product-info :data="shopDetailData" />
    <review-list :reviewData="shopDetailData.review" />
    <!-- <shop-map :addressData="addressData" /> -->
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import { ProductInfo, ReviewList, ShopMap } from '@/components'

export default {
    components: { ShopMap, ProductInfo, ReviewList },
    data() {
        return {
            id: this.$route.params._id,
            productData: '',
            reviewData: [],
            addressData: {},
        }
    },

    computed: {
        ...mapGetters('shop', ['shopDetailData']),
    },
    created() {
        // axios
        //     .get(
        //         `https://dev.local.com:9998/product/productdetail/${this.$route.params._id}`
        //     )
        //     .then(res => {
        //         this.productData = res.data
        //         this.reviewData = res.data.review
        //         this.addressData = {
        //             shop_address: res.data.shop_address,
        //             shop_name: res.data.shop_name,
        //         }
        //     })
        //     .catch(err => {
        //         return err
        //     })

        this.getShopDetail(this.$route.params._id)
    },
    methods: {
        ...mapActions('shop', ['getShopDetail']),
    },
}
</script>
