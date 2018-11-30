<template>
  <div id="contents">
    <ul class="list_product">
      <li v-for="item in productData" :key="item.shop_id">        
        <figure class="thumb_product">
          <img :src="item.thumbnail">
        </figure>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      productData:''
    };
  },
  created() {
      axios.get(`${process.env.ROOT_API}/client/productlist`).then(
        response => {
          this.productData = response.data.data
        },
        error => {
          console.log(error);
        }
      );
  },
  methods:{
    loadData(){

    }
  }
};
</script>