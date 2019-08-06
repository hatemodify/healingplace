<template>
  <vue-daum-map
    :appKey="appKey"
    :center.sync="center"
    :level.sync="level"
    :mapTypeId="mapTypeId"
    :libraries="libraries"
    @load="onLoad"
    style="width:100%;height:500px;"
  />
</template>

<script>
import VueDaumMap from 'vue-daum-map'
export default {
    components: { VueDaumMap },
    props: ['addressData'],
    data() {
        return {
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
    created() {},
    watch: {
        addressData: 'addressSearch',
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
                        content: `<div style='width:100px;text-align:center;padding:3px'>${opt.shop_name}</div>`,
                    })
                    infowindow.open(this.mapObject, marker)

                    this.mapObject.setCenter(coords)
                }
            })
        },
    },
}
</script>
