<template>
  <div id="contents">
    {{path}}
    <ul class="list_product">
      <li v-for="item in productData" :key="item._id">
        <router-link v-bind:to="{ name: 'ProductDetail', params: { _id: item._id } }">
          <figure class="thumb_product">
            <img :src="path">
            {{item.shop_id}}
            {{item.price_data[0].productName}}
            {{item.price_data[0].productPrice}}
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
      productData: "",
      thumb:'',
      path:require(`../../upload/thumb/ea52f2d9Group 7.png`)
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const query = vm.$route.query;
      const type = Object.keys(query)[0];
      const value = query[type];
      if(type){
      axios.get(`http://localhost:9998/product/productlist/${type}/${value}`).then(
        res => {
          vm._data.productData = res.data;
          vm.data.thumb = res.data.thumbnail[0].filename
          console.log(res.data.thumbnail[0].filename);
        },
        error => {
          console.log(error);
        }
      );
      }else{
        axios.get(`http://localhost:9998/product/productlist`).then(
        res => {
          vm._data.productData = res.data;

          vm._data.thumb = res.data[0].thumbnail[0].filename;

        },
        error => {
          console.log(error);
        }
      );
      }

    });
  },
  created() {},
  methods: {
    loadData() {}
  }
};
</script>
