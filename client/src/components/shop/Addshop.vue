<template>
  <section>
        <h3 class="subtitle" @click="submit">With Material Design Icons</h3>
        <b-field>
            <b-input placeholder="이름"
                icon="account" v-model="userData.name" maxlength="12" minlength="2" required>
            </b-input>
        </b-field>        
        <b-field>
            <b-input placeholder="아이디"
                icon="account" v-model="userData.userId" maxlength="12" minlength="2" required>
            </b-input>
        </b-field>
        <b-field>
            <b-input type="password" placeholder="패스워드"
                icon="onepassword" v-model="userData.password" password-reveal>
            </b-input>
        </b-field>
        <b-field>
            <b-input placeholder="주소"
                icon="home-map-marker" v-model="userData.address">
            </b-input>
        </b-field>
        <b-field>
            <b-input placeholder="전화번호"
                icon="phone-classic" v-model="userData.phone1">
            </b-input>
        </b-field>
        <b-field>
            <b-input placeholder="휴대폰번호"
                icon="phone" v-model="userData.phone2">
            </b-input>
        </b-field>    
        <b-field>
            <b-input placeholder="휴무일"
                icon="calendar-check" v-model="userData.personalDay">
            </b-input>
        </b-field>     
        <div class="cf mb30">
          <div class="fl mr20">
            <b-field label="카테고리">
              <b-select placeholder="카테고리를 선택하세요" v-model="userData.category">
                  <option
                      v-for="category in category"
                      :value="category"
                      :key="category">
                      {{category}}
                  </option>
              </b-select>
            </b-field>     
          </div>   
          <div class="fl">
            <b-field label="등급">
              <b-select placeholder="등급을 선택하세요" v-model="userData.level">
                  <option
                      v-for="level in level"
                      :value="level"
                      :key="level">
                      {{level}}
                  </option>
              </b-select>
            </b-field>     
          </div>    
        </div>       
        <button class="button is-medium is-danger" @click="submit">등록</button>
        
    </section>
</template>

<script>
import OPTIONS from '@/common/options';
import axios from 'axios';

export default {
  data() {
    return {
      id: '',
      password: '',
      region: OPTIONS.region,
      category: OPTIONS.category,
      level: OPTIONS.level,
      userData: {
        name: '',
        userId: '',
        password: '',
        address: '',
        phone1: '',
        phone2: '',
        personalDay: '',
        category: '',
        level: 0
      }
    };
  },
  created() {},
  methods: {
    alert() {
      this.$dialog.alert('등록 되었습니다.');
    },
    submit() {
      axios
        .post(`${process.env.ROOT_API}/shop/addShop`, this.userData)
        .then(() => {
          this.alert();
        });
    }
  }
};
</script>