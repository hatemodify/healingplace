<template>
  <div class="wrap_product">
    <h3 class="subtitle">상품 정보</h3>
    <section class="section_divide">
      <div class="cf mb20">
        <input type="text" v-model="productData._id">
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
      <label for="reg_thumb" class="wrap_profile">
        <img :src="image">
      </label>
      <input
        type="file"
        class="mb30"
        id="reg_thumb"
        name="reg_thumb"
        ref="reg_thumb"
        @change="onFileChange"
      >
      <b-field label="카테고리를 선택 하세요">
        <b-select v-model="productData.category" placeholder="Select a subject">
          <option value="1">카테고리1</option>
          <option value="2">카테고리2</option>
          <option value="2">카테고리3</option>
          <option value="2">카테고리4</option>
          <option value="2">카테고리5</option>
        </b-select>
      </b-field>
    </section>
    <section class="section_divide">
      <div class="cf">
        <label class="label">주소</label>
        <div class="control is-clearfix mb20">
          <input
            type="text"
            autocomplete="on"
            :value="shopData.shop_address"
            class="input"
            ref="addr"
          >
        </div>
        <label class="label">휴무일</label>
        <div class="control is-clearfix">
          <input type="text" autocomplete="on" :value="shopData.shop_personal_day" class="input">
        </div>
      </div>
    </section>
    <section class="section_divide">
      <b-field label="취소 환불 규정">
        <b-input type="textarea" v-model="productData.terms1"></b-input>
      </b-field>
    </section>
    <section class="section_divide">
      <vue-editor v-model="productData.detail"></vue-editor>
    </section>
    <div class="wrap_btn">
      <button class="button is-large is-danger" @click="formSubmit">저장</button>
    </div>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import axios from 'axios'

export default {
    components: {
        VueEditor,
    },
    props: ['data'],
    data() {
        return {
            productData: {
                shopId: localStorage.shopId,
                title: '',
                reservation: '불가능',
                priceData: [],
                detail: '',
                terms1: '',
                terms2: '',
                category: '',
                region: '',
                _id: this.$refs._id,
            },
            formData: new FormData(),
            shopData: {
                shop_address: '',
                shop_personal_day: '',
                _id: '',
            },
            image: '',
            images: [],
        }
    },
    beforeRouteEnter(to, from, next) {
        // axios
        //     .get(`http://localhost:9998/shop/addProduct/${localStorage.shopId}`)
        //     .then(res => {
        //         next(vm => {
        //             const resData = res.data
        //             const data = vm._data.shopData
        //             data.shop_address = resData.shop_address
        //             data.shop_personal_day = resData.shop_personal_day
        //             data.shop_name = resData.shop_name
        //             data._id = resData._id
        //             vm._data.productData._id = resData._id
        //             console.log(data)
        //         })
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    },
    methods: {
        deleteDropFile(index) {
            this.dropFiles.splice(index, 1)
        },
        addPrice() {
            const productName = this.$refs.productName.value
            const productPrice = this.$refs.productPrice.value

            if (productName && productPrice) {
                this.productData.priceData.push(
                    new Object({
                        productName,
                        productPrice,
                    })
                )
                this.$refs.productName.value = ''
                this.$refs.productPrice.value = ''
            }
        },
        removePrice(index) {
            this.productData.priceData.splice(index, 1)
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files
            if (!files.length) return
            this.createImage(files[0])
            this.images.push(this.$refs.reg_thumb.files)
        },
        createImage(file) {
            const image = new Image()
            const reader = new FileReader()

            reader.onload = e => {
                this.image = e.target.result
                // this.productData.thumbnail.push(vm.image)
            }
            reader.readAsDataURL(file)
        },
        removeImage: function(e) {
            this.image = ''
        },
        handleFilesUpload() {
            let uploadedFiles = this.$refs.files.files
        },
        formSubmit() {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
            this.images.forEach(elem => {
                this.formData.append('thumbnail', elem[0], elem[0].name)
            })
            for (let key in this.productData) {
                key === 'priceData'
                    ? this.formData.append(
                          key,
                          JSON.stringify(this.productData[key])
                      )
                    : this.formData.append(key, this.productData[key])
            }
            axios
                .post(
                    'http://localhost:9998/product/addProduct',
                    this.formData,
                    config
                )
                .then(() => {
                    console.log('success')
                    // this.$router.go(this.$router.currentRoute);
                })
                .catch(() => {
                    console.log('fail')
                })
        },
    },
}
</script>