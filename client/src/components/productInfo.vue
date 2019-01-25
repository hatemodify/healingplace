<template>
  <div class="product_info">
    <h3>{{data.title}}</h3>
    {{data.reservation}}
    <carousel>
      <slide v-for="item in data.thumbnail">
        <img :src="imgPath(item.filename)">
      </slide>
    </carousel>
    <ul>
      <li v-for="item in data.price_data" :key="item.name">
        <span>{{item.productName}}</span>
        <span>{{numComma(item.productPrice)}}</span>
      </li>
    </ul>
    <template v-if="data">
      <div>{{data.shop_address}}</div>
      <div>{{data.shop_personal_day}}</div>
    </template>
    <div v-html="data.detail"></div>
  </div>
</template>
<script>
import utils from '@/utils.js'
import { Carousel, Slide } from 'vue-carousel'
export default {
    props: ['data'],
    data() {
        return {
            numComma: utils.numComma,
        }
    },
    components: {
        Carousel,
        Slide,
    },
    methods: {
        imgPath(imageName) {
            return require(`../../upload/thumb/${imageName}`)
        },
    },
}
</script>
