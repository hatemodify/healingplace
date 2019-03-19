<template>
  <div class="wrap_opt">
    <button class="btn_select" ref="btnSelect" @click="showOpt">옵션선택</button>
    <div class="wrap_price">
      <ul class="list_opt">
        <li
          v-for="(item,index) in optData"
          :key="item.name"
          ref="productOpt"
          @click="selectOpt(index)"
        >
          <span class="txt_name">{{item.productName}}</span>
          <span class="txt_price">{{numComma(item.productPrice)}}원</span>
        </li>
      </ul>
    </div>
    <ul class="list_selected">
      <li v-for="(item,index) in selectedData" :key="item.name">
        <span class="txt_name">{{item.productName}}</span>
        <span class="txt_count">
          <span class="txt_inner">{{item.quantity}}</span>
          <span class="btn_count">
            <button class="btn_increase" @click="increase(index)"></button>
            <button class="btn_decrease" @click="decrease(index)"></button>
          </span>
        </span>
        <span class="txt_price">{{numComma(item.productPrice)}}원</span>
        <button class="btn_del" @click="deleteSelected(index)"></button>
      </li>
    </ul>
    <div class="wrap_btn">
      <button class="btn_cart">장바구니</button>
      <button class="btn_buy">구매하기</button>
    </div>
  </div>
</template>
<script>
import { numComma } from '@/utils/index'
export default {
    data() {
        return {
            numComma: numComma,
            selectedData: [],
        }
    },
    props: ['optData'],

    methods: {
        showOpt() {
            const btnSelect = this.$refs.btnSelect
            this.isActive = !this.isActive
            this.isActive
                ? btnSelect.classList.add('active')
                : btnSelect.classList.remove('active')
        },
        selectOpt(index) {
            this.$refs.btnSelect.classList.remove('active')
            this.isActive = false
            this.selectedData.indexOf(this.optData[index]) < 0
                ? this.selectedData.push(this.optData[index])
                : alert('이미 선택한 옵션입니다.')

            this.$set(
                this.selectedData[this.selectedData.length - 1],
                'quantity',
                1
            )
        },
        deleteSelected(index) {
            this.selectedData.splice(index, 1)
        },
        increase(index) {
            this.selectedData[index].quantity += 1
        },
        decrease(index) {
            if (this.selectedData[index].quantity > 1)
                this.selectedData[index].quantity -= 1
        },
    },
}
</script>
