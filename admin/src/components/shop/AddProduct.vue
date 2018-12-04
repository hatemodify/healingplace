<template>
  <div id="contents">
    <section class="section_divide">
      <h3 class="tit_page">상품 등록</h3>
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
            <input
              type="text"
              autocomplete="on"
              placeholder="상품명을 입력하세요"
              ref="productName"
              class="input"
            >
          </div>
        </div>
        <div class="field inp_size30">
          <label class="label">가격</label>
          <div class="control is-clearfix">
            <input
              type="number"
              autocomplete="on"
              placeholder="가격을 입력하세요"
              ref="productPrice"
              class="input"
            >
          </div>
        </div>
        <button class="button is-small is-primary mt30 ml10" @click="addPrice">추가</button>
      </div>
      <div v-for="(item, index) in productData.priceData" :key="index">
        <span class="txt_data">{{item.productName}}</span>
        <span class="txt_data">{{item.productPrice}}</span>
        <button class="delete is-small" type="button" @click="removePrice(index)"></button>
      </div>
    </section>
    <section class="section_divide">
      <label for="reg_profile" class="wrap_profile">
        <img :src="image">
      </label>
      <input
        type="file"
        class="mb30"
        id="reg_profile"
        name="reg_profile"
        ref="reg_profile"
        @change="onFileChange"
      >
      <b-field label="카테고리를 선택 하세요">
        <b-select placeholder="Select a subject">
            <option value="1">카테고리1</option>
            <option value="2">카테고리2</option>
            <option value="2">카테고리3</option>
            <option value="2">카테고리4</option>
            <option value="2">카테고리5</option>
        </b-select>
      </b-field>
    </section>
    <section class="section_divide">
      <vue-editor v-model="productData.detail"></vue-editor>
    </section>
    <section class="section_divide">
      <div class="cf">
        <label class="label">주소</label>
        <div class="control is-clearfix">
          <input type="text" autocomplete="on" class="input" v-model="productData.shop_address">
        </div>
      </div>
      <div>
        <label class="label">{{productData.shop_address}}</label>
        <input type="text" class="inp_size40" v-model="productData.shop_name" >
      </div>
    </section>
    <div class="wrap_btn">
      <button class="button is-large is-danger" @click="formSubmit">저장</button>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      productData: {
        shopId: localStorage.shopId,
        title: '',
        category:'',
        reservation: '불가능',
        priceData: [],
        thumbnail: [],
        detail: ''
      },
      image: ''
    };
  },
  created(){
    console.log('a');
  },
  beforeCreate() {
    console.log('b');
    const shopId = localStorage.shopId
    axios
      .get(`http://localhost:9998/shop/addProduct/${shopId}`)
      .then(res => {
        this.productData.shop_name = res.data.shop_name;
        this.productData.shop_address = res.data.shop_address;
        this.productData.shop_category = res.data.shop_category;
        this.productData.shop_personal_day = res.data.shop_personal_day;
        this.productData.shop_phone_number = res.data.shop_phone_number;
        console.log(this.productData);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    addPrice() {
      const productName = this.$refs.productName.value;
      const productPrice = this.$refs.productPrice.value;

      if (productName && productPrice) {
        this.productData.priceData.push(
          new Object({
            productName,
            productPrice
          })
        );

        this.$refs.productName.value = "";
        this.$refs.productPrice.value = "";
      }
    },
    removePrice(index) {
      this.productData.priceData.splice(index, 1);
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      // this.formData.append(
      //   'file',
      //   this.$refs.reg_profile.files[0],
      //   this.$refs.reg_profile.files[0].name
      // );
    },
    createImage(file) {
      const image = new Image();
      const reader = new FileReader();
      const vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
        console.log(vm.image);
        this.productData.thumbnail.push(vm.image);
      };
      reader.readAsDataURL(file);

      console.log(this.productData);
    },
    removeImage: function(e) {
      this.image = "";
    },
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      /*
          Adds the uploaded file to the files array
        */
    },
    formSubmit() {
      console.log(this.productData, this.productData.shopId);
      axios
        .post("http://localhost:9998/product/addProduct", this.productData)
        .then(() => {
          console.log("success");
        })
        .catch(() => {
          console.log("fail");
        });
    }
  }
};
</script>