<template>
  <div>
    <h1>Vue Daum Map Demo</h1>

    <vue-daum-map
      :appKey="appKey"
      :center.sync="center"
      :level.sync="level"
      :mapTypeId="mapTypeId"
      :libraries="libraries"
      @load="onLoad"
      @center_changed="onMapEvent('center_changed', $event)"
      @zoom_start="onMapEvent('zoom_start', $event)"
      @zoom_changed="onMapEvent('zoom_changed', $event)"
      @bounds_changed="onMapEvent('bounds_changed', $event)"
      @click="onMapEvent('click', $event)"
      @dblclick="onMapEvent('dblclick', $event)"
      @rightclick="onMapEvent('rightclick', $event)"
      @mousemove="onMapEvent('mousemove', $event)"
      @dragstart="onMapEvent('dragstart', $event)"
      @drag="onMapEvent('drag', $event)"
      @dragend="onMapEvent('dragend', $event)"
      @idle="onMapEvent('idle', $event)"
      @tilesloaded="onMapEvent('tilesloaded', $event)"
      @maptypeid_changed="onMapEvent('maptypeid_changed', $event)" style="width:500px;height:500px;">
    </vue-daum-map>

    <h2 @click="createdDummyData">Options</h2>
  </div>
</template>

<script>
import VueDaumMap from 'vue-daum-map';
import axios from 'axios';
export default {
  name: 'App',
  components: { VueDaumMap },
  data: () => ({
    appKey: 'eaf4c13b334e2ff65a4abdb939521573',
    level: 3,
    mapTypeId: VueDaumMap.MapTypeId.NORMAL,
    libraries: ['services', 'clusterer', 'drawing'],
    mapObject: null,
    latitude: '',
    longitude: '',
    center: { lat: '', lng: '' },
    geocoder: '',
    addr: []
  }),
  methods: {
    onLoad(map) {
      // 지도의 현재 영역을 얻어옵니다
      var bounds = map.getBounds();
      var boundsStr = bounds.toString();
      this.mapObject = map;
      this.geocoder = new daum.maps.services.Geocoder();
      console.log(this.mapObject.getCenter());
      this.searchAddrFromCoords(this.mapObject.getCenter(), this.callback);
      this.addr.forEach((item, index) => {
        this.addressSearch(item.shop_name);
      });
    },
    onMapEvent(event, params) {},
    searchAddrFromCoords(coords, callback) {
      this.geocoder.coord2RegionCode(
        coords.getLng(),
        coords.getLat(),
        callback
      );
    },
    // addressSearch(addr, fn) {
    //   if (status === daum.maps.services.Status.OK) {
    //     var coords = new daum.maps.LatLng(result[0].y, result[0].x);

    //     // 결과값으로 받은 위치를 마커로 표시합니다
    //     var marker = new daum.maps.Marker({
    //       map: map,
    //       position: coords
    //     });

    //     // 인포윈도우로 장소에 대한 설명을 표시합니다
    //     var infowindow = new daum.maps.InfoWindow({
    //       content:
    //         '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
    //     });
    //     infowindow.open(map, marker);

    //     // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    //     map.setCenter(coords);
    //   }
    // },
    callback(result, status) {
      if (status === 'OK') {
        console.log(result[0]);
      } else {
        console.log('fail');
      }
    },
    createdDummyData() {
      let i = 0;

      const regionArr = [];
      const nameArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
      const cateArr = ['가', '나', '다', '라', '마', '바', '사', '아', '자'];
      const shopAddress = [
        '서울특별시 마포구 희우정로 42-9 ',
        '서울특별시 마포구 신촌로 92',
        '서울특별시 마포구 마포대로24길 4, 공덕자이아파트 상가 상가1동 105호',
        '서울특별시 마포구 도화4길 73',
        '경상남도 창원시 진해구 제황로80번길 2, 1층 (충무동)',
        '경상남도 양산시 중앙로 134, (중부동)',
        '경기도 안산시 단원구 원선1로 38 (초지동, 상가동 205호)',
        '경기도 성남시 수정구 수정로 210, 1층 (신흥동)',
        '경기도 성남시 수정구 논골로35번길 2 (단대동)',
        '경기도 김포시 대곶면 율생중앙로 24',
        '인천광역시 서구 원당대로 663, 한종프라자 103호',
        '인천광역시 연수구 한나루로196번길 2',
        '인천광역시 부평구 안남로 261, 102호, 117호',
        '강원도 평창군 대화면 대화중앙로 158',
        '강원도 양양군 강현면 동해대로 3585'
      ];
      let shopName, shopCategory, region;
      let tempArr = [];
      let obj = {};
      shopAddress.forEach(item => {
        regionArr.push(item.split(' ')[0]);
      });
      for (; i <= 14; i++) {
        shopName =
          nameArr[this.ran(8, 0)] +
          nameArr[this.ran(8, 0)] +
          nameArr[this.ran(8, 0)] +
          nameArr[this.ran(8, 0)];
        shopCategory = cateArr[this.ran(cateArr.length - 1, 0)];
        obj = {
          shopName,
          region: regionArr[i],
          shopCategory,
          shopAddress: shopAddress[i]
        };
        tempArr.push(obj);

        axios
          .post('http://0.0.0.0:9998/dummy', tempArr[i])
          .then(status => {
            console.log(status);
          })
          .catch(status => {
            console.log(status);
          });
      }
    },
    ran(max, min) {
      return Math.round(Math.random() * (max - min) + min);
    }
  },

  created() {
    // navigator.geolocation.getCurrentPosition(position => {
    //   this.center.lat = position.coords.latitude;
    //   this.center.lng = position.coords.longitude;
    // });
    axios
      .get('http://0.0.0.0:9998/dummy')
      .then(response => {
        console.log(response);
        this.addr = response.data.addr;
        console.log(this.addr);
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {}
};
</script>