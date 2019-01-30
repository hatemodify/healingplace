<template>
  <div id="contents">
    <template v-if="data.length >0">
      <ul class="list_product">
        <li v-for="item in data" :key="item._id">
          <router-link v-bind:to="{ name: 'ProductDetail', params: { _id: item._id } }">
            <figure class="thumb_product">
              <img :src="imgPath(item.thumbnail[0].filename)">
              {{item.price_data[0].productName}}
              {{item.price_data[0].productPrice}}
            </figure>
          </router-link>
        </li>
      </ul>
    </template>
    <template v-else>등록된 상품 없음</template>
  </div>
</template>



<script>
import axios from 'axios'
export default {
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
