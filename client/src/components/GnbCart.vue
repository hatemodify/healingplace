<template>
  <div class="wrap_cart">
    <button class="btn_cart">{{cartData.length}}</button>
    <ul class="list_cart" v-if="cartData">
      <li></li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            cartData: '',
        }
    },
    props: ['userToken'],
    created() {
        this.getCartData(this.userToken)
    },
    watch: {},
    methods: {
        user() {
            console.log(this.userToken)
        },
        getCartData(userToken) {
            axios
                .get(`https://dev.local.com:9998/user/cart/${userToken}`)
                .then(res => {
                    console.log(res.data.cart)
                    this.cartData = res.data.cart
                    console.log(this.cartData)
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
}
</script>
