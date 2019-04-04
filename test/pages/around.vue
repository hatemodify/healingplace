<template>
  <div id="contents">
    <Preloader v-if="!load"/>
    <Sort :sortData="shopData"/>
    <ShopList :data="shopData"/>
  </div>
</template>
<script>
import axios from 'axios'
import { sortAsc, sortDesc } from '@/utils/index'
import { ShopList, Preloader, Sort } from '@/components'
export default {
  components: { ShopList, Preloader, Sort },
  data() {
    return {
      shopData: '',
      lat: this.$store.state.coordinates.latitude,
      lng: this.$store.state.coordinates.longitude,
      sortAsc: sortAsc,
      sortDesc: sortDesc,
      load: false
    }
  },
  created() {
    this.aroundShopList()
  },

  updated() {},
  methods: {
    async aroundShopList() {
      try {
        const shopData = await axios.get(
          `https://dev.local.com:3000/server/shop/near/${this.lat}/${this.lng}`
        )
        this.shopData = shopData.data
        this.load = true
        console.log(this.load)
      } catch (error) {
        return error
      }
    }
  }
}
</script>
