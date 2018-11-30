<template>
  <div id="contents">
    <section>
      <h3 class="tit_page">Login</h3>
      <div class="form_login">
        <b-field>
          <b-input
            placeholder="아이디"
            icon="account"
            v-model="userData.userId"
            maxlength="12"
            minlength="2"
            required
          ></b-input>
        </b-field>
        <b-field class="mb30">
          <b-input
            type="password"
            placeholder="패스워드"
            icon="onepassword"
            v-model="userData.password"
            password-reveal
            required
          ></b-input>
        </b-field>
        <button class="button is-large is-danger" @click="login">Login</button>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userData: {
        userId: "",
        password: ""
      }
    };
  },
  methods: {
    alert() {},
    login() {
      if (this.userData.userId && this.userData.password) {
      }
    }
  }
};
</script>