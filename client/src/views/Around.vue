<template>
  <div id="wrap">
    <p @click="sortDesc(shopData, 'review', 'rate_avg')">Lat = {{latitude}} Lon ={{longitude}}</p>

    <p @click="sortAsc(shopData, 'review', 'rate_avg')">Lat = {{latitude}} Lon ={{longitude}}</p>
    <ShopList :data="shopData"></ShopList>
  </div>
</template>
<script>
import axios from 'axios'
import util from '@/utils.js'
import { ShopList } from '@/components'
export default {
    components: { ShopList },
    data() {
        return {
            latitude: '',
            longitude: '',
            shopData: '',
            lat: this.$store.state.coordinates.latitude,
            lng: this.$store.state.coordinates.longitude,
            sortAsc: util.sortAsc,
            sortDesc: util.sortDesc,
        }
    },
    created() {
        this.aroundShopList()
    },
    updated() {},
    methods: {
        async aroundShopList() {
            try {
                if (this.lat !== '') {
                    const shopData = await axios.get(
                        `https://dev.local.com:9998/near/${this.lat}/${
                            this.lng
                        }`
                    )
                    this.shopData = shopData.data
                } else {
                    alert('위치정보 없음')
                }
            } catch (error) {
                return error
            }
        },
    },
}
</script>
