<template>
  <div id="content">
    <vue-daum-map
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      @load="onLoad"
      style="width:100%;height:500px;"
    ></vue-daum-map>
  </div>
</template>


<script>
import VueDaumMap from 'vue-daum-map'
import axios from 'axios'
export default {
    components: { VueDaumMap },
    data() {
        return {
            shopData: '',
            appKey: '002bf88c10aa0bca45e14a686a0f2b60',
            level: 3,
            mapTypeId: VueDaumMap.MapTypeId.NORMAL,
            libraries: ['services', 'clusterer', 'drawing'],
            mapObject: null,
            latitude: '',
            longitude: '',
            center: {
                lat: this.$store.state.coordinates.latitude,
                lng: this.$store.state.coordinates.longitude,
            },
        }
    },
    beforeCreate() {},
    methods: {
        near() {},
        onLoad(map) {
            const coordinates = this.$store.state.coordinates
            const lat = coordinates.latitude
            const lng = coordinates.longitude
            this.mapObject = map
            axios
                .get(`http://127.0.0.1:9998/near/${lat}/${lng}`)
                .then(res => {
                    this.shopData = res.data
                })
                .then(() => {
                    var positions = [
                        {
                            title: '카카오',
                            latlng: new daum.maps.LatLng(33.450705, 126.570677),
                        },
                        {
                            title: '생태연못',
                            latlng: new daum.maps.LatLng(33.450936, 126.569477),
                        },
                        {
                            title: '텃밭',
                            latlng: new daum.maps.LatLng(33.450879, 126.56994),
                        },
                        {
                            title: '근린공원',
                            latlng: new daum.maps.LatLng(33.451393, 126.570738),
                        },
                    ]

                    var imageSrc =
                        'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-32.png'

                    for (var i = 0; i < this.shopData.length; i++) {
                        var imageSize = new daum.maps.Size(32, 32)

                        var markerImage = new daum.maps.MarkerImage(
                            imageSrc,
                            imageSize
                        )

                        var marker = new daum.maps.Marker({
                            map: this.mapObject,
                            position: new daum.maps.LatLng(
                                this.shopData[i].location.coordinates[1],
                                this.shopData[i].location.coordinates[0]
                            ),
                            // title: this.shopData[i].title,
                            image: markerImage,
                        })
                    }
                })
        },
        a(map) {},
    },
}
</script>
