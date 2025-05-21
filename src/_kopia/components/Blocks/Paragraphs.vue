<template>
  <div class="ParagraphsBlock">
    <template v-for="(paragrah, paragrahIndex) in block.paragraphs">
      <p v-html="changeNewLine(paragrah.text)" v-if="paragrah.text !== ''" :key="paragrahIndex" :style="paragrah.style"></p>
    </template>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: "ParagraphsPageBlock",
  props: ['block'],
  data() {
    return {
    }
  },
  methods: {
    changeNewLine (text) {
      return text.replace(/\n/g, '<br />')
    }
  }
}
</script>
