<template>
    <div class="wrap_btn">
      <button class="btn_cart" @click="addCart(cartData)">장바구니</button>
      <button class="btn_buy">구매하기</button>
    </div>
</template>


<script>
export default {
    data() {
        return {}
    },
    props:['cartData'],
    methods: {
        addCart(data) {
          console.log(data)
        },
    },
}
</script>
