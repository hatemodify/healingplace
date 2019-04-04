<template>
  <div class="wrap_slide">
    <ul class="list_slide" id="list_slide">
      <li v-for="item in data" :key="item.filename" ref="lii">
        <div class="wrap_carousel">
          <img :src="imgPath(item.filename)">
        </div>
      </li>
    </ul>
    <ul class="slide_thumb" ref="ul">
      <li v-for="(item, index) in data" :key="item.index" @click="move(index)">
        <a href="javascipt:;">
          <img :src="imgPath(item.filename)">
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slide: this.$refs.list_slide
    }
  },
  props: ['data'],
  watch: {
    data: function() {
      const $slide = document.getElementById('list_slide')
      const width = $slide.parentNode.clientWidth
      const len = this.data.length
      $slide.style.width = width * len + `px`
    }
  },
  methods: {
    imgPath(imageName) {
      return require(`../../upload/thumb/${imageName}`)
    },

    move(index) {
      const $slide = document.getElementById('list_slide')
      const width = $slide.children.clientWidth
      $slide.style.transform = 'translateX(' + -480 * index + 'px'
    }
  }
}
</script>
