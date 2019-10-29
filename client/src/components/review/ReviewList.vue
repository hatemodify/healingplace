<template>
    <div class="review_comp">
        <div class="review_top">
            <span class="txt_count">
                전체 리뷰
                <strong>{{numComma(reviewData.review_list.length)}}</strong>개
            </span>
            <span class="txt_avg">
                평점 평균
                <strong>{{fixedNum(reviewData.rate_avg)}}</strong>
            </span>
            <div></div>
        </div>
        <write-review />

        <div class="wrap_reviewlist" v-if="reviewData.review_list">
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
                    <li
                        v-for="index in totalPage"
                        :key="index"
                        @click="changeCurrentPage(index - 1)"
                    >
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
import { numComma, fixedNum } from '@/utils/index'
import WriteReview from './WriteReview'
export default {
    components: { WriteReview },
    data() {
        return {
            numComma,
            fixedNum,
            currentPage: 0,
        }
    },
    props: {
        reviewData: {
            require: true,
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
            return this.reviewData.review_list.slice(start, end)
        },
        totalPage() {
            return Math.ceil(this.reviewData.review_list.length / 5)
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
