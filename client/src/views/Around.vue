<template>
  <div id="wrap">
    <p>Lat = {{latitude}} Lon ={{longitude}}</p>
    <product-list :data="shopData"></product-list>
  </div>
</template>
<script>
import axios from 'axios'
import productList from '@/components/list.vue'
export default {
    components: { productList },
    data() {
        return {
            latitude: '',
            longitude: '',
            shopData: '',
        }
    },
    beforeMount() {
        this.geo(this.getMyLocation)
        console.log(this.latitude)
    },
    methods: {
        geo: position => {
            navigator.geolocation.getCurrentPosition(position)
        },
        getMyLocation: function(position) {
            this.latitude = position.coords.latitude
            this.longitude = position.coords.longitude
            this.near()
        },
        near() {
            const lat = this.latitude
            const lng = this.longitude
            const coord = {
                lat,
                lng,
            }
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

