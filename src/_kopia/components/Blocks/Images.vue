<template>
  <div class="ImagesBlock">
    <div :style="block.imagesGroupStyle">
      <img v-for="(bl, index) in block.images" :key="index" :src="bl.src" :width="bl.style.width" :height="bl.style.height" :style="bl.style"/>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: "ImagesPageBlock",
  props: ['block'],
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
