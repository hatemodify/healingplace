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
            sortAsc: util.sortAsc,
            sortDesc: util.sortDesc,
        }
    },
    beforeMount() {
        this.near()
    },

    mounted() {},

    updated() {},
    methods: {
        near() {
            const coordinates = this.$store.state.coordinates
            const lat = coordinates.latitude
            const lng = coordinates.longitude
            axios.get(`http://127.0.0.1:9998/near/${lat}/${lng}`).then(res => {
                this.shopData = res.data
                console.log(res.data)

                // res.data.forEach(item => {
                //     let a = {
                //         shopName: item.shop_name,
                //         latlng: new daum.maps.LatLng(
                //             item.location.coordinates[1],
                //             item.location.coordinates[0]
                //         ),
                //     }
                //     this.addr.push(a)
                //     console.log(this.addr)
                // })
            })
        },
    },
}
</script>

