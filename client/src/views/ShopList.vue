<template>
  <div class="wrap_shoplist">
    <Preloader v-if="!load"/>
    <ShopList :data="ShopData" v-else/>
  </div>
</template>
<script>
import axios from 'axios'
import { ShopList, Preloader } from '@/components'
export default {
    data() {
        return {
            ShopData: '',
            load: false,
        }
    },
    components: { ShopList, Preloader },
    created() {
        this.getShopList()
    },
    methods: {
        async getShopList() {
            const query = this.$route.query
            const type = Object.keys(query)[0]
            const value = query[type]
            await axios
                .get(
                    `https://dev.local.com:9998/shop/shopList/${type}/${value}`
                )
                .then(
                    res => {
                        this.ShopData = res.data
                        this.load = true
                    },
                    error => {
                        console.log(error)
                    }
                )
        },
        imgPath(imageName) {
            return require(`../../upload/thumb/${imageName}`)
        },
    },
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     const query = vm.$route.query;
    //     const type = Object.keys(query)[0];
    //     const value = query[type];
    //     if(type){
    //     axios.get(`https://dev.local.com:9998/product/productlist/${type}/${value}`).then(
    //       res => {
    //         vm._data.productData = res.data;
    //         vm.data.thumb = res.data.thumbnail[0].filename
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     );
    //     }else{
    //       axios.get(`https://dev.local.com:9998/product/productlist`).then(
    //         res => {
    //           vm._data.productData = res.data;
    //           vm._data.thumb = res.data[0].thumbnail[0].filename;
    //           console.log(res)
    //         },
    //         error => {
    //           console.log(error);
    //         }
    //       );
    //     }
    //   });
    // },
    // created() {
    //     const query = this.$route.query
    //     const type = Object.keys(query)[0]
    //     const value = query[type]
    //     console.log(query)
    //     if (type) {
    //         axios
    //             .get(
    //                 `https://dev.local.com:9998/shop/shopList/${type}/${value}`
    //             )
    //             .then(
    //                 res => {
    //                     this.productData = res.data
    //                 },
    //                 error => {
    //                     console.log(error)
    //                 }
    //             )
    //     } else {
    //         axios.get(`https://dev.local.com:9998/product/productslist`).then(
    //             res => {
    //                 this.productData = res.data
    //             },
    //             error => {
    //                 console.log(error)
    //             }
    //         )
    //     }
    // },
}
</script>
