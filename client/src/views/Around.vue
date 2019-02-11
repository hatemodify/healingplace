<template>
  <div id="wrap">
    <p @click="sortDesc(shopData, 'review', 'rate_avg')">Lat = {{latitude}} Lon ={{longitude}}</p>

    <p @click="sortAsc(shopData, 'review', 'rate_avg')">Lat = {{latitude}} Lon ={{longitude}}</p>
    <shoplist :data="shopData"></shoplist>
  </div>
</template>
<script>
import axios from 'axios'
import util from '@/utils.js'
import shoplist from '@/components/Shoplist.vue'
export default {
    components: { shoplist },
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
        this.near()
    },

    mounted() {},

    updated() {},
    methods: {
        async near() {
            try {
                if (this.lat !== '') {
                    const shopData = await axios.get(
                        `http://127.0.0.1:9998/near/${this.lat}/${this.lng}`
                    )
                    this.shopData = shopData.data
                } else {
                    console.log('위치정보 없음')
                }
            } catch (e) {
                console.log(e)
            }
        },
    },
}
</script>

