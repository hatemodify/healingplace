<template>
  <div id="contents">
    <section>
      <h3 class="subtitle" @click="submit">With Material Design Icons</h3>
      <b-field>
        <b-input
          placeholder="이름"
          icon="account"
          v-model="shopData.shopName"
          maxlength="12"
          minlength="2"
          required
        ></b-input>
      </b-field>
      <b-field>
        <b-input
          placeholder="아이디"
          icon="account"
          v-model="shopData.shopId"
          maxlength="12"
          minlength="2"
          required
        ></b-input>
      </b-field>
      <b-field>
        <b-input
          type="password"
          placeholder="패스워드"
          icon="onepassword"
          v-model="shopData.password"
          password-reveal
        ></b-input>
      </b-field>
      <b-field>
        <b-input placeholder="주소" icon="home-map-marker" v-model="shopData.address"></b-input>
        <button class="button fr is-small is-danger" @click="getCoords">좌표불러오기</button>
      </b-field>
      <b-field>
        <input
          type="text"
          placeholder="y"
          icon="home-map-marker"
          v-model="shopData.latitude"
          ref="y"
        >
        <input
          type="text"
          placeholder="x"
          icon="home-map-marker"
          v-model="shopData.longitude"
          ref="x"
        >
      </b-field>
      <b-field>
        <b-input placeholder="전화번호" icon="phone-classic" v-model="shopData.phone1"></b-input>
      </b-field>
      <b-field>
        <b-input placeholder="휴대폰번호" icon="phone" v-model="shopData.phone2"></b-input>
      </b-field>
      <b-field>
        <b-input placeholder="휴무일" icon="calendar-check" v-model="shopData.personalDay"></b-input>
      </b-field>
      <div class="cf mb30">
        <div class="fl mr20">
          <b-field label="카테고리">
            <b-select placeholder="카테고리를 선택하세요" v-model="shopData.category">
              <option v-for="category in category" :value="category" :key="category">{{category}}</option>
            </b-select>
          </b-field>
        </div>
        <div class="fl">
          <b-field label="등급">
            <b-select placeholder="등급을 선택하세요" v-model="shopData.level">
              <option v-for="level in level" :value="level" :key="level">{{level}}</option>
            </b-select>
          </b-field>
        </div>
      </div>
      <button class="button is-medium is-danger" @click="submit">등록</button>
    </section>
  </div>
</template>

<script>
import OPTIONS from '@/util/options'
import VueDaumMap from 'vue-daum-map'
import axios from 'axios'

export default {
    data() {
        return {
            id: '',
            password: '',
            region: OPTIONS.region,
            category: OPTIONS.category,
            level: OPTIONS.level,
            shopData: {
                shopName: '',
                shopId: '',
                password: '',
                address: '',
                latitude: '',
                longitude: '',
                phone1: '',
                phone2: '',
                personalDay: '',
                category: '',
                level: 0,
            },
        }
    },
    created() {},
    methods: {
        dialog() {
            this.$dialog.alert('등록 되었습니다.')
        },
        submit() {
            axios
                .post(`https://dev.local.com:9998/shop/addShop`, this.shopData, {
                    headers: {
                        'Content-type': 'application/json',
                    },
                })
                .then(() => {
                    this.dialog()
                })
        },
        getCoords() {
            const appkey = `36b94e04f7eb04d98cf49baa6fa460d8`
            const query = encodeURIComponent(this.shopData.address)
            const config = {
                headers: {
                    Authorization: `KakaoAK ${appkey}`,
                },
            }
            if (!query) {
                alert('주소를 입력하세요')
                return
            }
            axios
                .get(
                    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`,
                    config
                )
                .then(res => {
                    console.log(res)
                    if (res.data.documents.length === 0) {
                        alert('올바른 주소를 입력하세요')
                    } else {
                        this.shopData.longitude = res.data.documents[0].x
                        this.shopData.latitude = res.data.documents[0].y
                        console.log(
                            this.shopData.longitude,
                            this.shopData.latitude
                        )
                    }
                })
        },
    },
}
</script>
