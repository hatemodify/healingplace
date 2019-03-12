<template>
  <div class="review_comp">
    <div class="review_top" v-if="reviewList">
      <span class="txt_count">
        전체 리뷰
        <strong>{{numComma(reviewList.length)}}</strong>개
      </span>
      <span class="txt_avg">
        평점 평균
        <strong>{{(reviewData.rate_avg)}}</strong>
      </span>
      <div></div>
    </div>
    <write-review/>

    <div class="wrap_reviewlist" v-if="reviewList">
      <ul class="review_list">
        <li v-for="item in paginatedData" :key="item.autor">
          <div class="wrap_info" v-if="item.author">
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
      <div class="wrap_pagination">
        <ul class="list_pagination" ref="pagination">
          <li v-for="index in totalPage" :key="index" @click="changeCurrentPage(index - 1)">
            <a href="javascript:;" v-if="index === 1" class="on">{{index}}</a>
            <a href="javascript:;" v-else>{{index}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>후기가 없습니다</div>
  </div>
</template>
<script>
import utils from '@/utils.js'
import WriteReview from './WriteReview.vue'
export default {
    components: { WriteReview },
    data() {
        return {
            numComma: utils.numComma,
            fixedNum: utils.fixedNum,
            currentPage: 0,
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
            const start = this.currentPage * this.pageSize
            const end = start + this.pageSize
            return this.reviewList.slice(start, end)
        },
        totalPage() {
            return Math.ceil(this.reviewList.length / 5)
        },
    },
    methods: {
        replaceName(txt) {
            return txt.replace(txt.substring(txt.length - 3, txt.length), '***')
        },
        nextPage() {
            this.currentPage += 1
            console.log(this.reviewList)
        },
        prevPage() {
            this.currentPage -= 1
            console.log(this.currentPage)
        },
        changeCurrentPage(idx) {
            this.currentPage = idx
            this.toggleClass(idx)
        },
        toggleClass(idx) {
            const pager = this.$refs.pagination
            pager.querySelector('.on').classList.remove('on')
            pager.children[idx].querySelector('a').classList.add('on')
        },
    },
}
</script>
