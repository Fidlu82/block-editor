<template>
<div id="ViewTemplate">

  <button @click="tabSelected = 'widok'" class="btn">widok</button>
  <button @click="tabSelected = 'json'" class="btn">json</button>

  <template v-if="tabSelected ==='widok'">
    <div class="view-content">
      <div class="view-block" v-for="block, blockIndex in jsonArray" :key="blockIndex">
        <template v-if="block.activeContent == 'header'">
          <BlockHeader :block="block"/>
        </template>
        <template v-if="block.activeContent == 'paragraphs'">
          <BlockParagraphs :block="block"/>
        </template>
        <template v-if="block.activeContent == 'table'">
          <BlockTable :block="block"/>
        </template>
        <template v-if="block.activeContent == 'images'">
          <BlockImages :block="block"/>
        </template>
        <template v-if="block.activeContent == 'lists'">
          <BlockLists :block="block"/>
        </template>
        <template v-if="block.activeContent == 'newpage'">
          <hr/>
        </template>
      </div>
    </div>
  </template>

  <template v-else>
    <div class="view-content">
      {{ strJson }}
    </div>
  </template>

</div>
</template>

<script>
import BlockHeader from "./Blocks/Header"
import BlockParagraphs from "./Blocks/Paragraphs"
import BlockTable from './Blocks/Table'
import BlockImages from './Blocks/Images'
import BlockLists from './Blocks/Lists'
import { mapGetters } from 'vuex'

export default {
  name: "ViewTemplatePage",
  components: {BlockHeader, BlockParagraphs, BlockTable, BlockImages, BlockLists},
  data() {
    return {
      tabSelected: 'widok'
    }
  },
  computed: {
    ...mapGetters('app', ['strJson']),
    jsonArray () {
      if (this.strJson && this.strJson !== null & typeof this.strJson === 'string') {
        let jsObject = JSON.parse(this.strJson)
        return jsObject
      } else {
        return this.strJson
      }
    }
  }
}
</script>

<style scoped>
.view-content {
  display: block;
}
.btn{
  display: inline-block;
  zoom: 1;
  padding: 6px 20px;
  margin: 0;
  cursor: pointer;
  border: 1px solid #bbb;
  overflow: visible;
  font: bold 13px arial, helvetica, sans-serif;
  text-decoration: none;
  white-space: nowrap;
  color: #555;
  background-color: #ddd;
  background-image: linear-gradient(top, rgba(255,255,255,1),
                                         rgba(255,255,255,0)),
                    url(data:image/png;base64,iVBORw0KGg[...]QmCC);
  transition: background-color .2s ease-out;
  background-clip: padding-box; /* Fix bleeding */
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, .3),
              0 2px 2px -1px rgba(0, 0, 0, .5),
              0 1px 0 rgba(255, 255, 255, .3) inset;
  text-shadow: 0 1px 0 rgba(255,255,255, .9);
}

.btn:hover{
  background-color: #eee;
  color: #555;
}

.btn:active{
  background: #e9e9e9;
  position: relative;
  top: 1px;
  text-shadow: none;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .3) inset;
}
</style>
