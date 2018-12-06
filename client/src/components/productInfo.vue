<template>
  <div class="product_info">
    <h3>{{data.title}}</h3>
    {{data.reservation}}
    <figure>
      <img :src="data.thumbnail">
    </figure>
    <ul>
      <li v-for="item in data.price_data" :key="item.name">
        <span>{{item.productName}}</span>
        <span>{{item.productPrice}}</span>
      </li>
    </ul>
    <div>{{data.shop_address}}</div>
    <div>{{data.shop_personal_day}}</div>
    <div v-html="data.detail"></div>
  </div>
</template>
<script>
export default {
  props: ["data"]
};
</script>
