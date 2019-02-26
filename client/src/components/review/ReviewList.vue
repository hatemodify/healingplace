<template>
  <div class="review_list">
    <div class="review_top" v-if="reviewList">
      <span class="txt_count">
        전체 리뷰
        <strong>{{numComma(reviewList.length)}}</strong>개
      </span>
      <span class="txt_avg">
        평점 평균
        <strong>{{(reviewData.rate_avg).toFixed(1)}}</strong>
      </span>
      <div></div>
    </div>
    <WriteReview/>
    <div class="wrap_reviewlist" v-if="reviewList">
      <ul class="review_list">
        <li v-for="item in reviewList" :key="item.autor">
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
      <div class="btn-cover">
        <button :disabled="currentPage === 0" @click="prevPage" class="page-btn">이전</button>
        <button :disabled="currentPage >= 10 - 1" @click="nextPage" class="page-btn">다음</button>
      </div>
    </div>
    <div v-else>후기가 없습니다</div>
  </div>
</template>
<script>
import utils from '@/utils.js'
import WriteReview from '@/components/review/WriteReview.vue'
export default {
    components: { WriteReview },
    data() {
        return {
            floor: utils.floor,
            numComma: utils.numComma,
            currentPage: 0,
            list: [],
        }
    },
    props: {
        reviewData: {
            require: true,
        },
        reviewList: {
            type: Array,
        },
        pageSize: {
            type: Number,
            default: 5,
        },
    },
    computed: {
        paginatedData() {
            const start = this.currentPage * this.pageSize,
                end = start + this.pageSize
            return this.reviewList.slice(start, end)
        },
    },
    methods: {
        replaceName(txt) {
            return txt.replace(txt.substring(txt.length - 3, txt.length), '***')
        },
        nextPage() {
            this.currentPage += 1
        },
        prevPage() {
            this.currentPage -= 1
            console.log(this.currentPage)
        },
    },
}
</script>
