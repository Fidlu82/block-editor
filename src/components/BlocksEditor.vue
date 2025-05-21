<template>
  <div class="container" @click.stop="selectBlock(null), selectElement(null)">
    <div class="blocks-column">

      <div class="btn-add">
        <button @click="addBlockUpDown(0)" class="btn-icons"><IconsVue :name="'add'"/></button>
      </div>

      <template v-if="Object.keys(blocks).length>0">

      <div class="block" v-for="(block, blockIndex) in blocks" :key="block.id"
          :class="[block.className, (selectedItem && selectedItem.type == 'block' && selectedItem.indexparent == blockIndex) ? 'activ-selected' : '']"
          :style="block.styles"
          @click.stop="selectBlock(blockIndex), selectElement('block', blockIndex)">

        <div class="block-content">

          <div class="nav-buttons">
            <button class="btn-nav" @click="moveBlock(blockIndex, -1)" :disabled="blockIndex === 0"><IconsVue :name="'move_up'"/></button>
            <button class="btn-nav" @click="moveBlock(blockIndex, 1)" :disabled="blockIndex === Object.keys(blocks).length - 1"><IconsVue :name="'move_down'"/></button>
            <button class="btn-nav btn-light" @click="removeBlock(blockIndex)"><IconsVue :name="'delete'"/></button>
          </div>

          <div class="menu-buttons" v-if="block.activeContent === ''">
            <md-menu md-direction="bottom-start" md-size="medium" :md-offset-x="80" :md-offset-y="-36" :mdCloseOnClick="closeOnClick" :mdCloseOnSelect="closeOnSelect" style="width:305px;">
              <md-button md-menu-trigger><IconsVue :name="'menu'"/></md-button>

              <md-menu-content>
                <md-menu-item>
                  <button @click="selectedContent(blockIndex,'header')" :disabled="block.activeContent === 'header'"  class="btn-icons-option"><IconsVue :name="'header'"/></button>
                  <button @click="selectedContent(blockIndex,'paragraphs')" :disabled="block.activeContent === 'paragraphs'"  class="btn-icons-option"><IconsVue :name="'paragraph'"/></button>
                  <button @click="selectedContent(blockIndex,'lists')" :disabled="block.activeContent === 'lists'"  class="btn-icons-option"><IconsVue :name="'list'"/></button>
                  <button @click="selectedContent(blockIndex,'table')" :disabled="block.activeContent === 'table'"  class="btn-icons-option"><IconsVue :name="'table'"/></button>
                  <button @click="selectedContent(blockIndex,'images')" :disabled="block.activeContent === 'images'"  class="btn-icons-option"><IconsVue :name="'image'"/></button>
                  <button @click="selectedContent(blockIndex,'newpage')" :disabled="block.activeContent === 'newpage'"  class="btn-icons-option"><IconsVue :name="'newpage'"/></button>

                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>

          <!-- Nagłówek -->
          <div class="field-header" v-if="block.activeContent === 'header'">
            <Header :blockIndex="blockIndex" :block="block"/>
          </div>
          <!-- Paragraf -->
          <div class="field-paragraphs" v-if="block.activeContent === 'paragraphs'">
            <Paragraph :blockIndex="blockIndex" :block="block"/>
          </div>
          <!-- Lista -->
          <div class="field-lists" v-if="block.activeContent === 'lists'">
            <List :blockIndex="blockIndex" :block="block"/>
          </div>
          <!-- Tabela -->
          <div class="field-table" v-if="block.activeContent === 'table'">
            <Table :blockIndex="blockIndex" :block="block"/>
          </div>
          <!-- Zdjęcia -->
          <div class="field-images" v-if="block.activeContent === 'images'">
            <Picture :blockIndex="blockIndex" :block="block"/>
          </div>
          <!-- Nowa strona -->
          <div class="field-newpage" v-if="block.activeContent === 'newpage'">
            <NewPage :blockIndex="blockIndex" :block="block"/>
          </div>

        </div> <!-- block-content -->

        <div v-if="Object.keys(blocks).length>0 && blockIndex<Object.keys(blocks).length-1" class="btn-add">
          <button @click="addBlockUpDown(blockIndex+1)" class="btn-icons"><IconsVue :name="'add'"/></button>
        </div>

      </div> <!-- block -->
      </template>

      <div v-if="Object.keys(blocks).length>0" class=" btn-add">
      <button @click="addBlockUpDown(Object.keys(blocks).length)" class="btn-icons"><IconsVue :name="'add'"/></button>
      </div>
<!--
      <div class="style-editor-column">
      <ElementStyle :selectedBlockIndex="selectedBlockIndex" :selectedItem="selectedItem" :blocks="blocks"/>
      </div> -->

    </div> <!-- blocks-column -->
  </div> <!-- container -->
</template>

  <script>
  import { mapGetters } from 'vuex'
  import { app } from '../mixins/app'

  import IconsVue from './Icons';
  import Header from './Blocks/Header'
  import Paragraph from './Blocks/Paragraph'
  import Picture from './Blocks/Picture'
  import List from './Blocks/List'
  import Table from './Blocks/Table';
  import NewPage from './Blocks/NewPage';
  // import ImageUploader from './ImageUploader'
  // import StyleEdit from './StyleEdit'
  // import ElementStyle from './ElementStyle'

  export default {
    name: 'BlocksEditorPage',
    mixins: [app],
    data() {
    return {
      // blocks: [],
        activeContent: '',
        selectedBlockIndex: null,
        selectedGroupIndex: null,
        // selectedImageIndex: null,
        // selectedHeaderIndex: null,
        // selectedItem: {},
        closeOnClick: true,
        closeOnSelect: true,
        // showTooltip: false
      };
    },
    components: {IconsVue, Header, Paragraph, Picture, List, Table, NewPage}, // , ImageUploader, StyleEdit, ElementStyle},
    watch: {
      // templateLoaded (newValue) {
      //   this.updateDataBlocks()
      // },
    },
    computed: {
      ...mapGetters('app', ['blocks', 'blocksLoaded', 'selectedItem']), // blocks
      // blocksJson () {
      //   return JSON.parse(JSON.stringify(this.blocks))
      // }
    },
    methods: {
      addBlockUpDown (index) {
        const className = prompt('Podaj klasę CSS dla bloku:') || '';
        var block = {
          id: Date.now(),
          className: className,
          activeContent: this.activeContent,
          styles: { display: 'block', float: 'none', position: 'static', borderRadius: '0px', border: '', height: 'auto', width: '100%', padding: '10px 10px 10px 10px', margin: '0px' },
        }
        this.$store.commit('app/ADD_BLOCK', [index, block])
      },
      selectBlock(index) {
        console.log('---- selectBlock ----')
        this.selectedBlockIndex = index
        this.selectedGroupIndex = null
      },
      selectedContent (index,content) {
        console.log('---- selectedContent ----')
        this.$store.commit('app/SET_BLOCK_CONTENT', [index, 'activeContent', content])
      },
      // ========================================================================
      // setTemplateManual (data) {
      //   console.log('---- setTemplateManual ----')
      //   this.$store.commit('app/SET_SELECTED_SYMBOL', [])
      //   this.$store.commit('app/SET_TEMPLATE_LOADED', 'manual')
      //   this.$store.commit('app/SET_BLOCKS_MANUAL',data)
      // },
      // clearInputs (parentID, childID, kidsID) {
      //   console.log('---- clearInputs ----')
      //   this.blocks[parentID].table.structure.rows[childID][kidsID].cell.value = ''
      //   this.blocks[parentID].table.structure.rows[childID][kidsID].cell.style = {}

      //   this.setTemplateManual(this.blocks)
      // },
      // toggleTooltip() {
      //   console.log('---- toggleTooltip ----')
      //   this.showTooltip = !this.showTooltip;
      // },
      // // optionSelected(option) {
      // //   alert(`Wybrano: ${option}`);
      // //   this.showTooltip = false;
      // // },
      removeBlock(index) {
        this.$store.commit('app/REMOVE_BLOCK', index)
      },
      moveBlock(index, direction) {
        this.$store.commit('app/MOVE_BLOCK', [index, direction])
      },
      // // input
      // addInput(blockIndex) {
      //   this.blocks[blockIndex].inputs.push({ id: Date.now(), value: "" });
      //   this.setTemplateManual(this.blocks)
      // },
      // removeInput(blockIndex, inputIndex) {
      //   this.selectedItem = {}
      //   this.blocks[blockIndex].inputs.splice(inputIndex, 1);
      //   this.setTemplateManual(this.blocks)
      // },

      // // tabela
      // // addRow(blockIndex,rowId) {
      // //   this.blocks[blockIndex].table.structure.rows.splice(rowId + 1, 0, new Array(this.blocks[blockIndex].table.structure.rows[0].length).fill().map(() => ({cell: { value: "", style: {padding:'6px'}}, type: 'text', style: {}})));
      // //   this.setTemplateManual(this.blocks)
      // // },
      // // removeRow(blockIndex, rowIndex) {
      // //   this.selectedItem = {}
      // //   this.blocks[blockIndex].table.structure.rows.splice(rowIndex, 1);
      // //   this.setTemplateManual(this.blocks)
      // // },
      // // addColumn(blockIndex, colId) {
      // //   // this.blocks[blockIndex].table.forEach(row => row.push({cell: { value: "", style: {}}, type: 'text', style: {}}));
      // //   this.blocks[blockIndex].table.structure.rows.forEach(row => row.splice(colId + 1, 0, {cell: { value: "", style: {padding:'6px'}}, type: 'text', style: {}}));
      // //   this.setTemplateManual(this.blocks)

      // //   // this.tableData.forEach(row => row.splice(this.selectedCol + 1, 0, "Nowa"));
      // //   // this.columnStyles.splice(this.selectedCol + 1, 0, { backgroundColor: "" });
      // //   // this.cellStyles.forEach(row => row.splice(this.selectedCol + 1, 0, { color: "#000000", backgroundColor: "", bold: false, italic: false }));
      // // },
      // // removeColumn(blockIndex, colIndex) {
      // //   this.selectedItem = {}
      // //   this.blocks[blockIndex].table.structure.rows.forEach(row => row.splice(colIndex, 1));
      // //   this.setTemplateManual(this.blocks)
      // // },
      // editStyleGroup (index) {
      //   this.selectedBlockIndex = index
      //   this.selectedGroupIndex = index
      //   this.selectedImageIndex = null
      // },
      // editStyleElement (index) {

      // },
      // editStyleHeader (index) {
      //   this.selectedBlockIndex = index
      //   this.selectedHeaderIndex = index
      // },

      // updateDataBlocks () {
      //   console.log('---- updateDataBlocks ----')
      //   if (!this.template || this.template === null) {
      //     this.blocks = []
      //   } else {
      //     this.blocks = JSON.parse(JSON.stringify(this.template))
      //   }
      // },
      getImagesList () {
        this.$store.dispatch('app/get_images_list')
      }
    },
    created () {
      this.getImagesList()
    }
  }
  </script>

  <style>
    .lists-ul {
      padding: 4px;
    }
    .lists-li {
      padding: 4px;
    }
    .list-item-li{
      padding: 4px;
    }
    .list-item-li:hover {
      border: 1px solid #02a1fd;
    }
    .table-option-btn {
      display:block; margin: 8px 0px; width: 100%; padding: 4px; display: block ruby; cursor: pointer;
    }
    .btn {
      cursor: pointer;
    }
    .activ-selected {
      border: 1px solid #02a1fd;
    }
    .box-paragraphs-group:hover {
      border: 1px solid #02a1fd;
    }
    .table:hover {
      border: 1px solid #02a1fd;
    }
    .table-tr:hover {
      border: 1px solid #02a1fd;
    }
    .table-td:hover {
      border: 1px solid #02a1fd;
    }
    .table-input:hover {
      border: 1px solid #02a1fd;
    }
    .nav-buttons {
      height: 24px;
      text-align: right;
    }
    .menu-buttons {
      text-align: left;
    }
    .block {
      margin-bottom: 20px;
      padding: 10px 10px 10px 10px;
    }
    .block:hover {
      border: 1px solid #02a1fd;
    }
    .block-content {
      border: 1px solid #ccc;
      padding: 10px 10px 10px 10px;
      margin-bottom: 0px;
    }
    /* .block-content:hover {
      border: 1px solid #02a1fd;
    } */
     .elements-group:hover {
      border: 1px solid #02a1fd;
      padding: 10px 10px 10px 10px;
     }

    .block-image:hover {
      padding: 10px;
    }
    .block-image:hover {
      border: 1px solid #02a1fd;
    }
    .block-img:hover {
      border: 1px solid #02a1fd;
    }
    .image-box {
      padding: 10px 10px 10px 10px;
    }
    .image-box:hover {
      border: 1px solid #02a1fd;
    }
    /* .block-content:hover {
      border: 1px solid black;
      padding: 20px;
      margin-bottom: 20px;
    } */

    .btn-nav {
      padding: 0px 8px;
      margin-bottom: 20px;
      background-color: #3c83ce;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      line-height: 11px;
      height: 22px;
    }
    .btn-light {
      background-color: #ecebeb;
    }
    .btn-icons {
      border: none;
      background: none;
      cursor: pointer;
      padding: 10px;
      width: 100%;
    }
    .btn-add {
      border: 1px dashed #bdbdbd;
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .btn-add:hover {
      border: 1px dashed #686868;
    }
    .btn-icons-option {
      padding: 2px 12px;
      margin-right: 8px;
      background-color: #42b983;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .style-editor {
      min-width: 350px;
    position: relative;
    top: 20px;
    right: 20px;
    background: white;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  .md-menu-content.md-menu-content-medium {
    max-width:305px;
  }

  .style-editor label {
    display: block;
    margin-bottom: 10px;
  }

  .container {
    display: flex;
    gap: 20px;
  }

  .blocks-column {
    flex: 2;
  }
  .style-editor-column {
    position: relative;
    flex: 1;
    background: white;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    min-height: 400px;
    max-width: 345px;
  }
  .style-editor-column label {
    display: block;
    margin-bottom: 10px;
  }
</style>
