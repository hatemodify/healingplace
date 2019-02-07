<template>
  <div id="contents">
    <template v-if="data.length >0">
      <ul class="list_product">
        <li v-for="item in data" :key="item._id">
          <router-link v-bind:to="{ name: 'ProductDetail', params: { _id: item._id } }">
            <picture class="thumb_product">
              <img :src="imgPath(item.thumbnail[0].filename)" class="thumb_img">
            </picture>
            <div class="wrap_info">
              <span class="txt_sub"></span>
              <strong class="tit_shop">{{item.shop_name}}</strong>
              <span class="txt_name">{{item.price_data[0].productName}}</span>
              <span class="txt_price">{{util.numComma(item.price_data[0].productPrice)}}원</span>
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
    <template v-else>등록된 상품 없음</template>
  </div>
</template>



<script>
import axios from 'axios'
import util from '@/utils.js'
export default {
    data() {
        return {
            util,
        }
    },
    props: ['data'],
    created() {
        const query = this.$route.query
        const type = Object.keys(query)[0]
        const value = query[type]
        if (type) {
            axios
                .get(`http://localhost:9998/shop/shopList/${type}/${value}`)
                .then(
                    res => {
                        this.productData = res.data
                        console.log('type')
                    },
                    error => {
                        console.log(error)
                    }
                )
        } else {
            axios.get(`http://localhost:9998/product/productslist`).then(
                res => {
                    this.productData = res.data
                },
                error => {
                    console.log(error)
                }
            )
        }
    },
    methods: {
        imgPath(imageName) {
            return require(`../../upload/thumb/${imageName}`)
        },
    },
}
</script>
