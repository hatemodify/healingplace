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
            addressData: {},
        }
    },

    computed: {
        ...mapGetters('shop', ['shopDetailData']),
    },
    created() {
        this.getShopDetail(this.$route.params._id)
    },
    methods: {
        ...mapActions('shop', ['getShopDetail']),
    },
}
</script>
