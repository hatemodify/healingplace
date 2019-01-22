<template>
  <div id="wrap">
    <p>Lat = {{center.lat}} Lon ={{center.lng}}</p>

    <p>{{temp}}</p>
    <!-- <vue-daum-map
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      style="width:500px;height:500px;"
    ></vue-daum-map>-->
    <br>
    <button @click="near">near</button>
    {{addr}}
  </div>
</template>
<script>
import axios from 'axios'
import VueDaumMap from 'vue-daum-map'
export default {
    components: { VueDaumMap },
    data() {
        return {
            error: '',
            lat: '',
            lon: '',
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
            temp: '',
        }
    },

    beforeMount() {
        Promise.resolve(this.geo(this.getMyLocation)).then((lat, lng) => {})
        console.log(1)
    },
    methods: {
        geo: position => {
            navigator.geolocation.getCurrentPosition(position)
        },
        getMyLocation: function(position) {
            this.center.lat = position.coords.latitude
            this.center.lng = position.coords.longitude
            this.latitude = position.coords.latitude
            this.longitude = position.coords.longitude
            this.near()
        },
        onLoad(map) {},

        near() {
            const lat = this.latitude
            const lng = this.longitude
            const coord = {
                lat,
                lng,
            }
            axios.get(`http://127.0.0.1:9998/near/${lat}/${lng}`).then(res => {
                console.log(res)
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
        markerr(map) {
            this.near()
            setTimeout(() => {
                this.mapObject = map
                var imageSrc =
                    'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png'
                for (var i = 0; i < this.addr.length; i++) {
                    // 마커 이미지의 이미지 크기 입니다
                    var imageSize = new daum.maps.Size(24, 35)

                    // 마커 이미지를 생성합니다
                    var markerImage = new daum.maps.MarkerImage(
                        imageSrc,
                        imageSize
                    )

                    var marker = new daum.maps.Marker({
                        map: this.mapObject, // 마커를 표시할 지도
                        title: this.addr[i].shopName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다.
                        position: this.addr[i].latlng, // 마커를 표시할 위치
                        image: markerImage, // 마커 이미지
                    })
                }
            }, 500)
        },
    },
}
</script>
