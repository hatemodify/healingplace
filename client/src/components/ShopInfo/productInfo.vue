<template>
  <div class="product_info">
    <div class="info_top mb50">
      <div class="shop_thumb">
        <ImageSlider :data="data.thumbnail" />
      </div>
      <div class="shop_info">
        <h3 class="tit_shop">{{data.shop_name}}</h3>
        <p class="desc_shop">{{data.description}}</p>
        <span class="txt_address">{{data.shop_address}}</span>
        <!-- {{data.reservation}} -->
        <Option :optData="data.price_data" />
        <ShopBtn :cartData="'asdasdasd'" />
      </div>
      <template v-if="data">
        <div>{{data.shop_personal_day}}</div>
      </template>
      <div class="cb mb50" v-html="data.terms1" />
      <div class="cb" v-html="data.detail" />
    </div>
  </div>
</template>
<script>
import { fixedNum, numComma } from '@/utils/index'
import ImageSlider from '@/components/ShopInfo/ImageSlider'
import Option from '@/components/ShopInfo/Option'
import ShopBtn from '@/components/ShopInfo/ShopBtn'

export default {
    props: ['data'],
    data() {
        return {
            fixedNum: fixedNum,
            numComma: numComma,
            isActive: false,
        }
    },
    components: {
        ImageSlider,
        Option,
        ShopBtn,
    },
}
</script>
