<template>
  <div id="wrap">
    <p>Lat = {{latitude}} Lon ={{longitude}}</p>
    <shoplist :data="shopData"></shoplist>
  </div>
</template>
<script>
import axios from 'axios'
import shoplist from '@/components/Shoplist.vue'
export default {
    components: { shoplist },
    data() {
        return {
            latitude: '',
            longitude: '',
            shopData: '',
        }
    },
    beforeMount() {
        this.near()
    },

    mounted() {},
    methods: {
        near() {
            const coords = this.$store.state.coords
            const lat = coords.latitude
            const lng = coords.longitude
            axios.get(`http://127.0.0.1:9998/near/${lat}/${lng}`).then(res => {
                this.shopData = res.data
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

