<template>
  <section>
    <h3 class="tit_page">상품 등록</h3>
    <div class="">
      {{productData.shopId}}
    </div>
    <div class="cf">
      <b-field label="제목" class="fl inp_size60">
        <b-input v-model="productData.title" placeholder="제목을 입력하세요"></b-input>
      </b-field>
      <div class="fl ml30">
        <span class="label">예약가능 여부</span>
        <b-switch
          is-large
          v-model="productData.reservation"
          true-value="가능"
          false-value="불가능"
        >{{ productData.reservation }}</b-switch>
      </div>
    </div>
    <div class="cf">
      <div class="field inp_size30">
        <label class="label">상품명</label>
        <div class="control is-clearfix">
           <input type="text" autocomplete="on" placeholder="상품명을 입력하세요" ref="productName" class="input">
        </div>
      </div> 
      <div class="field inp_size30">
        <label class="label">가격</label> 
          <div class="control is-clearfix">
           <input type="number" autocomplete="on" placeholder="가격을 입력하세요" ref="productPrice" class="input">
          </div>
        </div> 
        <button class="button is-small is-danger mt30 ml10" @click="addPrice">추가</button>
    </div>
    <div v-for="(item, index) in productData.priceData" :key="index">
      <span class="txt_data">{{item.productName}}</span> 
      <span class="txt_data">{{item.productPrice}}</span>
      <button class="delete is-small" type="button" @click="removePrice(index)"></button>
    </div>
    <vue-editor></vue-editor>
  </section>
</template>
<script>
import { VueEditor } from 'vue2-editor';

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      productData: {
        shopId: localStorage.shopId,
        title: "",
        reservation: "불가능",
        priceData: []
      },
      components: {},
      dropFiles: []
    };
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    addPrice() {

      const productName = this.$refs.productName.value
      const productPrice = this.$refs.productPrice.value

      if (productName && productPrice) {
        this.productData.priceData.push(
          new Object({
            productName,
            productPrice
          })
        );
  
        this.$refs.productName.value = '';
        this.$refs.productPrice.value = '';
      }
    },
    removePrice(index) {
      this.productData.priceData.splice(index, 1);
    }
  }
};
</script>