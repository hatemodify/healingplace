<template>
  <div class="write_review" v-if="this.$store.state.userInfo.Eea">
    <div class="cf">
      <input type="text" class="txt_author" :value="this.$store.state.userInfo.userName">
      <!-- <em class="txt_author">{{this.$store.state.userInfo.userName}}</em> -->
      <div class="wrap_rate">
        <div class="rate_star">
          <input
            type="radio"
            id="rate1"
            class="screen_out"
            name="productRate"
            value="1"
            v-model="review.rate"
          >
          <input
            type="radio"
            id="rate2"
            class="screen_out"
            name="productRate"
            value="2"
            v-model="review.rate"
          >
          <input
            type="radio"
            id="rate3"
            class="screen_out"
            name="productRate"
            value="3"
            v-model="review.rate"
          >
          <input
            type="radio"
            id="rate4"
            class="screen_out"
            name="productRate"
            value="4"
            v-model="review.rate"
          >
          <input
            type="radio"
            id="rate5"
            class="screen_out"
            name="productRate"
            value="5"
            v-model="review.rate"
          >
          <label for="rate1" class="lab_rate1"></label>
          <label for="rate2" class="lab_rate2"></label>
          <label for="rate3" class="lab_rate3"></label>
          <label for="rate4" class="lab_rate4"></label>
          <label for="rate5" class="lab_rate5"></label>
          <span class="rate_on"></span>
        </div>
        <em class="txt_rate"></em>
      </div>
    </div>
    <div class="wrap_cont">
      <textarea class="txt_content" v-model="review.content"></textarea>
    </div>
    <button class="btn_write" @click="writeReview()">작성</button>
  </div>
</template>
<script>
import axios from 'axios'
import utils from '@/utils'

export default {
    data() {
        return {
            fixedNum: utils.fixedNum,
            review: {
                author: this.$store.state.userInfo.userName,
                content: '',
                rate: '',
                rateAvg: '',
            },
        }
    },

    created() {
        const Eea = this.$store.state.Eea
        if (Eea)
            axios
                .get(`https://dev.local.com:9998/user/userInfo/${Eea}`)
                .then(res => {
                    this.review.author = res.data.user_name
                })
    },

    methods: {
        writeReview() {
            this.validate()
        },
        validate() {
            if (!this.review.content) {
                alert('내용을 입력해주세요')
                return
            } else if (this.review.content.length < 10) {
                alert('10자 이상 입력해 주세요')
                return
            } else if (!this.review.rate) {
                alert('평점을 입력해 주세요')
                return
            } else {
                axios
                    .post(
                        `https://dev.local.com:9998/product/productdetail/${
                            this.$route.params._id
                        }`,
                        this.review
                    )
                    .then(res => {
                        alert('등록 되었습니다')
                        this.$router.go(this.$router.currentRoute)
                    })
                    .catch(err => {
                        console.log(this.review)
                        console.log(err)
                    })
            }
        },
    },
}
</script>
