<template>
  <div class="wrap_product">
    <h3 class="subtitle">상품 정보</h3>
    <section class="section_divide">
      <div class="cf mb20">
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
    </section>

    <section class="section_divide">
      <b-field label="취소 환불 규정">
        <b-input type="textarea" v-model="productData.terms1"></b-input>
      </b-field>
    </section>
    <section class="section_divide">
      <vue-editor v-model="productData.detail"></vue-editor>
    </section>
    <!-- <div class="wrap_btn">
      <button class="button is-large is-danger" @click="formSubmit">저장</button>
    </div>-->
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import axios from 'axios'

export default {
    components: {
        VueEditor,
    },
    props: ['productData', 'images', 'formData'],
    data() {
        return {
            image: '',
        }
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
            console.log(this.productData.priceData)
        },
        removePrice(index) {
            this.productData.priceData.splice(index, 1)
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files
            if (!files.length) return
            this.createImage(files[0])
            this.images.push(this.$refs.reg_thumb.files)
            console.log(this.images)
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
        formSubmit(imgArr, formData, data) {
            // console.log(typeof this.images)
            imgArr.forEach(elem => {
                formData.append('thumbnail', elem[0], elem[0].name)
            })

            for (let key in data) {
                key === 'priceData'
                    ? formData.append(key, JSON.stringify(data[key]))
                    : formData.append(key, data[key])
            }
            // axios
            //     .post(
            //         'http://localhost:9998/product/addProduct',
            //         this.formData,
            //         config
            //     )
            //     .then(() => {
            //         console.log('success')
            //         // this.$router.go(this.$router.currentRoute);
            //     })
            //     .catch(() => {
            //         console.log('fail')
            //     })
        },
    },
}
</script>