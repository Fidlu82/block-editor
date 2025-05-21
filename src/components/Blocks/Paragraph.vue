<template>
  <div id="BlockParagraph">

    <h3>Paragraf</h3>
    <button @click="addParagraph(blockIndex)"><IconsVue :name="'add'"/></button>
    <div @click.stop="selectElement('paragraphs-group', blockIndex)" :style="tmpBlock.paragraphsGroupStyle" class="box-paragraphs-group"
      :class="(selectedItem && selectedItem.type === 'paragraphs-group' && Number(selectedItem.indexparent) === Number(blockIndex)) ? 'activ-selected' : ''" >
      <div v-for="(paragraph, paragraphIndex) in tmpBlock.paragraphs" :key="paragraph.id" style="position:relative; margin: 20px;">
        <p contenteditable
          @input="updateParagraph($event, blockIndex, paragraphIndex)"
          @click.stop="selectElement('paragraphs', blockIndex, paragraphIndex)"
          :style="tmpBlock.paragraphs[paragraphIndex].style"
          >{{ paragraph.text }}</p>
        <button class="btn"
          v-if="selectedItem && selectedItem.indexparent == blockIndex && selectedItem.indexchild == paragraphIndex"
          @click="removeParagraph(blockIndex, paragraphIndex)" style="position: absolute;  right: 0px;  top: -14px;">
          <IconsVue :name="'delete'"/></button>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { app } from '../../mixins/app'

  import IconsVue from '../Icons';

  export default {
    name: 'BlockParagraphPage',
    props: ['blockIndex', 'block'],
    mixins: [app],
    components: {IconsVue},
    data() {
      return {
        tmpBlock: []
      }
    },
    computed: {
      ...mapGetters('app',['selectedItem'])
    },
    watch: {
      block (newValue) {
        this.updateLocalBlock()
      }
    },
    methods: {
      addParagraph(index) {
        this.tmpBlock.paragraphs.push({ id: Date.now(), text: "....", style: {padding: "5px"}})
        this.$store.commit('app/SET_BLOCK_VALUE', [index, 'paragraphs', this.tmpBlock.paragraphs])
      },
      removeParagraph(index, paragraphIndex) {
        this.tmpBlock.paragraphs.splice(paragraphIndex, 1);
        this.$store.commit('app/SET_BLOCK_VALUE', [index, 'paragraphs', this.tmpBlock.paragraphs])
      },
      updateParagraph(event, index, paragraphIndex) {
        console.log(event.target.innerText)
        this.tmpBlock.paragraphs[paragraphIndex].text = event.target.innerText;
        this.$store.commit('app/SET_BLOCK_VALUE', [index, 'paragraphs', this.tmpBlock.paragraphs])
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

