<template>
  <div class="wrap_sort">
    <button class="btn_sort" @click="sortAsc(sortData, 'review', 'rate_avg')">평점 낮은순</button>
    <button class="btn_sort" @click="sortDesc(sortData, 'review', 'rate_avg')">평점 높은순</button>
  </div>
</template>

<script>
import { sortAsc, sortDesc } from '@/utils/index'
export default {
  data() {
    return {
      sortAsc: sortAsc,
      sortDesc: sortDesc
    }
  },
  props: ['sortData']
}
</script>
