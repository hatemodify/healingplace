<template>
  <div class="wrap_review">
    <template v-if="data.length > 0">
      <ul>
        <li v-for="item in data" :key="item.autor">
          <span class="txt_data">{{item.author}}</span>
          <span class="txt_content">{{item.content}}</span>
          <span class="txt_content">{{item.created}}</span> -
          <span class="rate">{{item.rate}}</span>
          {{rateAvg(item.rate)}}
        </li>
      </ul>
    </template>
    <template v-else>후기가 없습니다.</template>
    <div class="write_review">
      <input type="text" v-model="review.author">
      <textarea v-model="review.content"></textarea>
      <div class="wrap_rate">
        <div class="rate_star">
        <input type="radio" id="rate1" class="screen_out" name="productRate" value="1" v-model="review.rate">
        <input type="radio" id="rate2" class="screen_out" name="productRate" value="2" v-model="review.rate">
        <input type="radio" id="rate3" class="screen_out" name="productRate" value="3" v-model="review.rate">
        <input type="radio" id="rate4" class="screen_out" name="productRate" value="4" v-model="review.rate">
        <input type="radio" id="rate5" class="screen_out" name="productRate" value="5" v-model="review.rate">
        <label for="rate1" class="lab_rate1"></label>
        <label for="rate2" class="lab_rate2"></label>
        <label for="rate3" class="lab_rate3"></label>
        <label for="rate4" class="lab_rate4"></label>
        <label for="rate5" class="lab_rate5"></label>
        <span class="rate_on"></span>
        </div>
        <em class="txt_rate"></em>
      </div>
      <button class="button" @click="writeReview">작성</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import utils from "@/utils.js";
export default {
  props: ["data"],
  data() {
    return {
      review: {
        author: "",
        content: "",
      },
    };
  },
  computed: {

  },
  methods: {
    rateAvg(rate){
      let avg = avg + rate
    },
    writeReview() {
      axios
        .post(
          `http://localhost:9998/product/productdetail/${
            this.$route.params._id
          }`,
          this.review
        )
        .then(res => {
          alert("등록 되었습니다");
          this.$router.go(this.$router.currentRoute);
        })
        .catch(err => {
          console.log(this.review);
          console.log(err);
        });
    }
  }
};
</script>
