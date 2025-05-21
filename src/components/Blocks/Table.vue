<template>
  <div id="BlockTable">

    <h3>Tabela</h3>
    <table class="table" @click.stop="selectElement('table', blockIndex)" style="display: block; padding: 10px;"
      :class="(selectedItem && selectedItem.type == 'table' && Number(selectedItem.indexparent) == Number(blockIndex)) ? 'activ-selected' : ''" :style="(selectedItem.indexparent) ? block.table.style : ''">

      <tr class="table-tr" v-for="(row, rowIndex) in tmpBlock.table.structure.rows" :key="rowIndex" @click.stop="selectElement('tableTr', blockIndex, rowIndex)" style="padding: 10px;display: flex;"
        :class="(selectedItem && selectedItem.type == 'tableTr' && selectedItem.indexparent == blockIndex && selectedItem.indexchild == rowIndex) ? 'activ-selected' : ''">

        <td class="table-td" v-for="(cell, cellIndex) in row" :key="cellIndex" @click.stop="selectElement('tableTd', blockIndex, rowIndex, cellIndex)" style="padding: 10px;width: 33%; display: block; position: relative;"
        :style="tmpBlock.table.structure.rows[rowIndex][cellIndex].style"
        :class="(selectedItem && selectedItem.type == 'tableTd' && selectedItem.indexparent == blockIndex && selectedItem.indexchild == rowIndex && selectedItem.index == cellIndex) ? 'activ-selected' : ''">
        {{ cell.type }}
          <template v-if="cell.type=='text'">
            <input class="table-input" @blur="updateTableCell($event, blockIndex, rowIndex, cellIndex)" v-model="cell.cell.value" @click.stop="selectElement('tableInput', blockIndex, rowIndex, cellIndex)" style="width: 100%; text-align: left;" :style="block.table.structure.rows[rowIndex][cellIndex].cell.style"/>
          </template>
          <template v-if="cell.type=='img'">
            <!-- v-if="block.table.structure.rows[rowIndex][cellIndex].cell.value == ''"  -->
            <ImageUploader @selectedImage="imageSelected"/>
            <img :src="tmpBlock.table.structure.rows[rowIndex][cellIndex].cell.value" alt="" :style="block.table.structure.rows[rowIndex][cellIndex].cell.style" @click.stop="selectElement('image', blockIndex, rowIndex, cellIndex)">
          </template>
          <template v-if="cell.type==''"></template>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { app } from '../../mixins/app'
  import ImageUploader from '../ImageUploader'

  export default {
    name: 'BlockTablePage',
    props: ['blockIndex', 'block'],
    mixins: [app],
    data() {
      return {
        tmpBlock: []
      }
    },
    components: {ImageUploader},
    computed: {
      ...mapGetters('app',['selectedItem'])
    },
    watch: {
      // block (newValue) {
      //   console.log(newValue)
      //   this.updateLocalBlock()
      // },
      block: {
        handler(newVal) {
          this.updateLocalBlock()
        },
        deep: true
      }
    },
    methods: {
      updateTableCell (event, blockIndex, rowIndex, cellIndex) {
        this.tmpBlock.table.structure.rows[rowIndex][cellIndex].value = event.target.value;
        this.$store.commit('app/SET_BLOCK_VALUE', [blockIndex, 'table', this.tmpBlock.table])
      },
      imageSelected (event) {
        //  :blockIndex="blockIndex" :rowIndex="rowIndex" :cellIndex="cellIndex"
        var indexBlock = this.selectedItem.indexparent
        var indexRow = this.selectedItem.indexchild
        var indexCell = this.selectedItem.index
        const imageUrl = event

        this.tmpBlock.table.structure.rows[indexRow][indexCell].cell.value = imageUrl
        this.tmpBlock.table.structure.rows[indexRow][indexCell].cell.style = {align: 'left', float: 'none', padding: '6px', margin: '0px', width: '100%', height: 'auto'}
        this.$store.commit('app/SET_BLOCK_VALUE', [indexBlock, 'table', this.tmpBlock.table])
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

