<template>
  <div id="BlockHeader">

    <h3 style="margin: 0px;">Nagłówek</h3>
    <label>Wybierz poziom nagłówka:</label>

    <select v-model.lazy="tmpBlock.header.type" @change="changeHeader()">
      <option value="h1">H1</option>
      <option value="h2">H2</option>
      <option value="h3">H3</option>
      <option value="h4">H4</option>
      <option value="h5">H5</option>
      <option value="h6">H6</option>
    </select>
    <div style="width:100%; margin:10px">
      <component
        :is="tmpBlock.header.type"
        contenteditable
        @click.stop="selectElement('header', blockIndex)"
        @blur="updateHeaderText($event)"
        :style="tmpBlock.header.style"
        style="background: #f2f2f2;"
      >
        {{ tmpBlock.header.text }}
      </component>
    </div>

  </div>
</template>

<script>
  import { app } from '../../mixins/app'

  export default {
    name: 'BlockHeaderPage',
    props: ['blockIndex', 'block'],
    mixins: [app],
    data() {
      return {
        tmpBlock: []
      }
    },
    watch: {
      block (newValue) {
        this.updateLocalBlock()
      }
    },
    methods: {
      updateHeaderText(event) {
        this.tmpBlock.header.text = event.target.innerText;
        this.$store.commit('app/SET_BLOCK_VALUE', [this.blockIndex, 'header', this.tmpBlock.header])
      },
      changeHeader () {
        this.$store.commit('app/SET_BLOCK_VALUE', [this.blockIndex, 'header', this.tmpBlock.header])
      },
      updateLocalBlock () {
        this.tmpBlock = JSON.parse(JSON.stringify(this.block))
      }
    },
    created () {
      this.updateLocalBlock()
    }
  }
</script>

<style scoped>
</style>

