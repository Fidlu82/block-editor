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
    setStateStrJson (data) {
      console.log(this.blocks)
      this.$store.commit('app/SET_INPUT_SYMBOL', [])
      this.$store.commit('app/SET_READ_JSON', 'manual')
      this.$store.commit('app/SET_BLOCKS_MANUAL',data)
    },
    clearInputs (parentID, childID, kidsID) {
      console.log('clearInputs')
      this.blocks[parentID].table.structure.rows[childID][kidsID].cell.value = ''
      this.blocks[parentID].table.structure.rows[childID][kidsID].cell.style = {}

      this.setStateStrJson(this.blocks)
    },
    removeImage(blockIndex, imageIndex, cellIndex=null) {
      this.selectedItem = {}
      if (cellIndex == null) {
        this.blocks[blockIndex].images.splice(imageIndex, 1);
      } else {
        this.blocks[blockIndex].table.structure.rows[imageIndex][cellIndex].cell.value = '';
      }
      this.setStateStrJson(this.blocks)
    },
    imageSelected (event, index, rowIndex, cellIndex) {
      if (event && event !=='') {
        const imageUrl = event
        if (rowIndex != null && cellIndex != null) {
          const imageUrl = event
          this.blocks[index].table.structure.rows[rowIndex][cellIndex].cell.value = imageUrl
          this.blocks[index].table.structure.rows[rowIndex][cellIndex].cell.style = {align: 'left', float: 'none', padding: '6px', margin: '0px', width: '100%', height: 'auto'}
        } else {
          this.blocks[index].images.push({ id: Date.now(), src: imageUrl, style: {align: 'left', float: 'none', padding: '6px', margin: '0px', width: '200px', height: 'auto' }});
        }
      }
      this.setStateStrJson(this.blocks)
    },
    logout () {
      // sessionStorage.clear()
      // localStorage.clear()
      // this.userData = {}
      // this.showLogin = false
      // this.zalogowany = false
      // this.$router.go(this.$router.currentRoute)
    },
    addRow(blockIndex,rowId) {
      this.blocks[blockIndex].table.structure.rows.splice(rowId + 1, 0, new Array(this.blocks[blockIndex].table.structure.rows[0].length).fill().map(() => ({cell: { value: "", style: {padding:'6px'}}, type: 'text', style: {}})));
      this.setStateStrJson(this.blocks)
    },
    removeRow(blockIndex, rowIndex) {
      this.selectedItem = {}
      this.blocks[blockIndex].table.structure.rows.splice(rowIndex, 1);
      this.setStateStrJson(this.blocks)
    },
    addColumn(blockIndex, colId) {
      // this.blocks[blockIndex].table.forEach(row => row.push({cell: { value: "", style: {}}, type: 'text', style: {}}));
      this.blocks[blockIndex].table.structure.rows.forEach(row => row.splice(colId + 1, 0, {cell: { value: "", style: {padding:'6px'}}, type: 'text', style: {}}));
      this.setStateStrJson(this.blocks)

      // this.tableData.forEach(row => row.splice(this.selectedCol + 1, 0, "Nowa"));
      // this.columnStyles.splice(this.selectedCol + 1, 0, { backgroundColor: "" });
      // this.cellStyles.forEach(row => row.splice(this.selectedCol + 1, 0, { color: "#000000", backgroundColor: "", bold: false, italic: false }));
    },
    removeColumn(blockIndex, colIndex) {
      this.selectedItem = {}
      this.blocks[blockIndex].table.structure.rows.forEach(row => row.splice(colIndex, 1));
      this.setStateStrJson(this.blocks)
    }
  }
}
