<template>
  <div id="contents">
    <div class="info_top">
      <div class="shop_thumb">
        <slider :data="data"></slider>
      </div>
      <div class="shop_info">
        <h3 class="tit_shop">{{data.shop_name}}</h3>
        <span class="txt_g">{{data.shop_address}}</span>
        {{data.reservation}}
        <ul>
          <li v-for="item in data.price_data" :key="item.name">
            <span>{{item.productName}}</span>
            <span>{{numComma(item.productPrice)}}</span>
          </li>
        </ul>
        <Btn/>
      </div>
    </div>
    <template v-if="data">
      <div>{{data.shop_personal_day}}</div>
    </template>
    <div>{{data.terms1}}</div>
    <div v-html="data.detail"></div>
  </div>
</template>
<script>
import utils from '@/utils.js'
import Slider from './Slider'
import Btn from './Btn'
export default {
    props: ['data'],
    data() {
        return {
            fixedNum: utils.fixedNum,
            numComma: utils.numComma,
        }
    },
    components: {
        Slider,
        Btn,
    },
    methods: {},
}
</script>
