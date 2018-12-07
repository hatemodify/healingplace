<template>
  <div id="contents">
    <ul class="list_product">
      <li v-for="item in productData">
        <router-link v-bind:to="{ name: 'ProductDetail', params: { _id: item._id } }">
          <figure class="thumb_product">
            {{item.shop_id}}
            <img :src="item.thumbnail">
          </figure>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      productData: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      axios.get(`http://localhost:9998/product/productlist`).then(
        res => {
          vm._data.productData = res.data;
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    });
  },
  created() {},
  methods: {
    loadData() {}
  }
};
</script>