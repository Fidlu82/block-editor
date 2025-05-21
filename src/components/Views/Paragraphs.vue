<template>
  <div class="ParagraphsBlock">
    <template v-for="(paragrah, paragrahIndex) in block.paragraphs">
      <p v-html="changeNewLine(paragrah.text)" v-if="paragrah.text !== ''" :key="paragrahIndex" :style="paragrah.style"></p>
    </template>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import cloneDeep from 'lodash/cloneDeep'

export default {
  name: "ParagraphsPageBlock",
  props: ['block'],
  data() {
    return {
      tabSelected: 'widok',
      localBlocks: []
    }
  },
  // computed: {
  //   ...mapGetters('app', ['selectedItem', 'blocks'])
  //   // jsonArray () {
  //   //   if (this.blocks && this.blocks !== null) {
  //   //     if (typeof this.blocks === 'string') {
  //   //       let jsObject = JSON.parse(this.blocks)
  //   //       return jsObject
  //   //     } else {
  //   //       return this.blocks
  //   //     }
  //   //   }
  //   // }
  // },
  // watch: {
  //   blocks: {
  //     immediate: true,
  //     handler(newVal) {
  //       this.localBlocks = cloneDeep(newVal)
  //     }
  //   }
  // },
  methods: {
    changeNewLine (text) {
      return text.replace(/\n/g, '<br />')
    }
  }
}
</script>
