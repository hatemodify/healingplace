<template>
    <div id="contents">
        <Preloader v-if="!load" />
        <Sort :sortData="shopList" />
        <shop-list :data="shopList" />
    </div>
</template>
<script>
import axios from 'axios'
import { sortAsc, sortDesc } from '@/utils/index'
import { ShopList, Preloader, Sort } from '@/components'
import { mapGetters } from 'vuex'
export default {
    components: { ShopList, Preloader, Sort },
    data() {
        return {
            sortAsc: sortAsc,
            sortDesc: sortDesc,
            load: false,
        }
    },
    computed: mapGetters('shop', ['shopList']),
    updated() {
        this.load = true
    },
    watch: {},
    methods: {},
}
</script>
