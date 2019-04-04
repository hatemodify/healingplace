<template>
  <div id="contents">
    <template v-if="!data.length">등록된 상품 없음</template>
    <template v-else>
      <ul class="list_product">
        <li v-for="item in data" :key="item._id">
          <router-link v-bind:to="{ name: 'ShopDetail', params: { _id: item._id } }">
            <picture class="thumb_product" v-if="item.thumbnail[0].filename">
              <img :src="imgPath(item.thumbnail[0].filename)" class="thumb_img">
            </picture>
            <div class="wrap_info">
              <span class="txt_sub"></span>
              <strong class="tit_shop">{{item.shop_name}}</strong>
              <span class="txt_name">{{item.price_data[0].productName}}</span>
              <span class="txt_price">{{numComma(item.price_data[0].productPrice)}}원</span>
              <div class="wrap_rate" :class="['rate_' + item.review.rate_avg]">
                <div class="rate_star">
                  <span class="rate_on" :style="{width:20 * item.review.rate_avg + '%'}"></span>
                </div>
                <em class="txt_rate">{{item.review.rate_avg}}</em>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </template>
  </div>
</template>



<script>
import axios from 'axios'
import { numComma } from '@/utils/index'
export default {
  data() {
    return {
      numComma: numComma
    }
  },
  props: ['data'],

  methods: {
    imgPath(imageName) {
      return require(`../upload/thumb/${imageName}`)
    }
  }
}
</script>
