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
export default {
    props: ['data'],
    methods: {
        imgPath(imageName) {
            return require(`../../upload/thumb/${imageName}`)
        },
    },
}
</script>
