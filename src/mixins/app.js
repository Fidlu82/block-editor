export const app = {
  data () {
    return {
      selectedImageIndex: null,
      // showLogin: false,
      // zalogowany: false,
      // userData: {}
    }
  },
  watch: {
    // userData (newValue) {
    //   this.userData = newValue
    // },
    // zalogowany (newValue) {
    //   this.zalogowany = newValue
    // }
  },
  methods: {
    selectElement(type=null, indexparent=null, indexchild=null, index=null, event=null) {
      console.log('---- selectElement ----')
      this.$store.commit('app/SET_ITEM_SELECTED', {type: type, indexparent: indexparent, indexchild: indexchild, index: index, event: event})
    },
    // setTemplateManual (data) {
    //   console.log(this.blocks)
    //   this.$store.commit('app/SET_INPUT_SYMBOL', [])
    //   this.$store.commit('app/SET_READ_JSON', 'manual')
    //   this.$store.commit('app/SET_BLOCKS_MANUAL',data)
    // },
    // clearInputs (parentID, childID, kidsID) {
    //   console.log('clearInputs')
    //   this.blocks[parentID].table.structure.rows[childID][kidsID].cell.value = ''
    //   this.blocks[parentID].table.structure.rows[childID][kidsID].cell.style = {}

    //   this.setTemplateManual(this.blocks)
    // },
    // removeImage(blockIndex, imageIndex, cellIndex=null) {
    //   this.selectedItem = {}
    //   if (cellIndex == null) {
    //     this.blocks[blockIndex].images.splice(imageIndex, 1);
    //   } else {
    //     this.blocks[blockIndex].table.structure.rows[imageIndex][cellIndex].cell.value = '';
    //   }
    //   this.setTemplateManual(this.blocks)
    // },
    // imageSelected (event, index, rowIndex, cellIndex) {
    //   if (event && event !=='') {
    //     const imageUrl = event
    //     if (rowIndex != null && cellIndex != null) {
    //       const imageUrl = event
    //       this.blocks[index].table.structure.rows[rowIndex][cellIndex].cell.value = imageUrl
    //       this.blocks[index].table.structure.rows[rowIndex][cellIndex].cell.style = {align: 'left', float: 'none', padding: '6px', margin: '0px', width: '100%', height: 'auto'}
    //     } else {
    //       this.blocks[index].images.push({ id: Date.now(), src: imageUrl, style: {align: 'left', float: 'none', padding: '6px', margin: '0px', width: '200px', height: 'auto' }});
    //     }
    //   }
    //   this.setTemplateManual(this.blocks)
    // },
    // logout () {
    //   // sessionStorage.clear()
    //   // localStorage.clear()
    //   // this.userData = {}
    //   // this.showLogin = false
    //   // this.zalogowany = false
    //   // this.$router.go(this.$router.currentRoute)
    // },

  }
}
