<template>
  <div class="wrap_review">
    <div class="review_top" v-if="data.review_list">
      <span class="txt_count">
        전체 리뷰
        <strong>{{numComma(data.review_list.length)}}</strong>개
      </span>
      <span class="txt_avg">
        평점 평균
        <strong>{{(data.rate_avg).toFixed(1)}}</strong>
      </span>
      <div></div>
    </div>
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
    <template v-if="data.review_list">
      <ul class="review_list">
        <li v-for="item in data.review_list" :key="item.autor">
          <div class="wrap_info">
            <span class="txt_author">{{replaceName(item.author)}}</span>
            <div class="wrap_rate" :class="['rate_' + item.rate]">
              <div class="rate_star">
                <span class="rate_on" :style="{width:20 * item.rate + '%'}"></span>
              </div>
            </div>
            <span class="txt_date">{{item.created}}</span>
          </div>
          <span class="txt_content">{{item.content}}</span>
        </li>
      </ul>
    </template>
    <template v-else>후기가 없습니다.</template>
  </div>
</template>
<script>
import axios from 'axios'
import utils from '@/utils.js'
export default {
    props: ['data'],
    data() {
        return {
            review: {
                author: this.$store.state.userInfo.userName,
                content: '',
                rate: '',
            },
            floor: utils.floor,
            numComma: utils.numComma,
        }
    },
    created() {
        const Eea = this.$store.state.Eea
        if (Eea)
            axios
                .get(`https://dev.local.com:9998/user/userInfo/${Eea}`)
                .then(res => {
                    this.review.author = res.data.user_name
                    console.log(this.author)
                })
    },
    mounted() {
        console.log(this.$store.state.userInfo.userName)
    },
    methods: {
        replaceName(txt) {
            return txt.replace(txt.substring(txt.length - 3, txt.length), '***')
        },
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
