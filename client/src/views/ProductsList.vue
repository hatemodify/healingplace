<template>
  <div id="contents">
    <template v-if="productData.length >0">
      <ul class="list_product">
        <li v-for="item in productData" :key="item._id">
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
import axios from "axios";
export default {
  data() {
    return {
      productData: "",
      thumb: ""
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     const query = vm.$route.query;
  //     const type = Object.keys(query)[0];
  //     const value = query[type];
  //     if(type){
  //     axios.get(`http://localhost:9998/product/productlist/${type}/${value}`).then(
  //       res => {
  //         vm._data.productData = res.data;
  //         vm.data.thumb = res.data.thumbnail[0].filename
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //     }else{
  //       axios.get(`http://localhost:9998/product/productlist`).then(
  //         res => {
  //           vm._data.productData = res.data;
  //           vm._data.thumb = res.data[0].thumbnail[0].filename;
  //           console.log(res)
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //     }
  //   });
  // },
  created() {
    const query = this.$route.query;
    const type = Object.keys(query)[0];
    const value = query[type];
    console.log(query);
    if (type) {
      axios
        .get(`http://localhost:9998/product/productslist/${type}/${value}`)
        .then(
          res => {
            this.productData = res.data;
            console.log("type");
          },
          error => {
            console.log(error);
          }
        );
    } else {
      axios.get(`http://localhost:9998/product/productslist`).then(
        res => {
          this.productData = res.data;
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  methods: {
    imgPath(imageName) {
      return require(`../../upload/thumb/${imageName}`);
    },
    convertJSON(data) {
      JSON.parse(data);
    }
  }
};
</script>
