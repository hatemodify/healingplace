<template>
  <div id="contents">
    <h3>{{data.title}}</h3>
    {{data.reservation}}
    <figure>
      <img :src="data.thumbnail">
    </figure>
    <ul>
      <li v-for="item in data.price_data" :key="item.name">
        <span>{{item.productName}}</span>
        <span>{{item.productPrice}}</span>
      </li>
    </ul>
    <div v-html="data.detail">
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data(){
      return{
        id : this.$route.params._id,
        data:'',

      }
    },
    created() {
      axios.get(`http://localhost:9998/client/productdetail/${this.id}`).then((res)=>{
        this.data = res.data.productData[0]
      })
    },
  }
</script>