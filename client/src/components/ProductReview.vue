<template>
  <div class="wrap_review">
    <ul>
      <li v-for="item in data" :key="item.autor">
        <span class="txt_author">{{item.author}}</span>
        <span class="txt_content">{{item.content}}</span>
      </li>
    </ul>
    <input type="text" v-model="review.author">
    <textarea v-model="review.content"></textarea>
    <button class="button" @click="write">작성</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: ["data"],
  data(){
    return{
      review:{
        author:'',
        content:''
      }
    }
  },

  methods:{
    write(){
      axios.post(`http://localhost:9998/product/productdetail/${this.$route.params._id}`, this.review)
      .then(() => {
        console.log('success');
      })
      .catch((err) => {
        console.log(this.review)
        console.log(err);
      });
    }
  }
};

</script>
