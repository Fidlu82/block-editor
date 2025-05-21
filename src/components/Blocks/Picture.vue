<template>
  <div id="BlockPicture">
    <ImageUploader @selectedImage="imageSelected"/>
    <div class="elements-group" @click.stop="selectElement('images-group', blockIndex)" :style="tmpBlock.imagesGroupStyle">
      <img v-for="(image, imageIndex) in blocks[blockIndex].images" @click.self="editStyleImage(imageIndex)"  :key="image.id" :src="image.src" alt="Dodany obraz" @click.stop="selectElement('image', blockIndex, imageIndex)" :style="image.style"/>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { app } from '../../mixins/app'
  import ImageUploader from '../ImageUploader'

  export default {
    name: 'BlockPicturePage',
    props: ['blockIndex', 'block'],
    mixins: [app],
    components: {ImageUploader},
    data() {
      return {
        tmpBlock: []
      }
    },
    computed: {
      ...mapGetters('app',['selectedItem', 'blocks'])
    },
    watch: {
      block (newValue) {
        this.updateLocalBlock()
      }
    },
    methods:{
      addImage(blockIndex) {
      //   const imageUrl = prompt('Podaj URL obrazu:');
      //   if (imageUrl) {
      //     this.blocks[blockIndex].images.push({ id: Date.now(), src: imageUrl, style: {align: 'left', float: 'none', padding: '0px', margin: '0px', width: '200px', height: 'auto' }});
      //   }
      //   this.setTemplateManual(this.blocks)
      },
      removeImage(blockIndex, imageIndex, cellIndex=null) {
      //   this.selectedItem = {}
      //   if (cellIndex == null) {
      //     this.blocks[blockIndex].images.splice(imageIndex, 1);
      //   } else {
      //     this.blocks[blockIndex].table.structure.rows[imageIndex][cellIndex].cell.value = '';
      //   }
      //   this.setTemplateManual(this.blocks)
      },
      editStyleImage (index) {
        // this.selectedImageIndex = index
      },
      imageSelected (event) {
        const imageUrl = event
        this.tmpBlock.images.push({ id: Date.now(), src: imageUrl, style: {align: 'left', float: 'none', padding: '6px', margin: '0px', width: '200px', height: 'auto' }})
        this.$store.commit('app/SET_BLOCK_VALUE', [this.blockIndex, 'images', this.tmpBlock.images])
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

