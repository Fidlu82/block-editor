<template>
  <div class="TableBlock">
    <table class="" :style="block.table.style">
      <tr v-for="(row, rowIndex) in block.table.structure.rows" :key="rowIndex" :style="block.table.structure.style">
        <!-- {{ row }} { "cell": { "value": "11", "style": { "padding": "6px" } }, "type": "text", "style": {} } -->
        <td v-for="(col, colIndex) in row" :key="colIndex" style="border:1px solid #000" :style="camelToKebab(col.style)">
          <template v-if="col.type==='text'">
            <span :style="camelToKebab(col.cell.style)">{{ col.cell.value }}</span>
          </template>
          <template v-else>
            <img :src="col.cell.value" alt="" :style="col.cell.style">
          </template>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import { app } from '../../mixins/helpers'

export default {
  name: "TablePageBlock",
  props: ['block'],
  // mixins: [app],
  data() {
    return {
    }
  },
  methods: {
    camelToKebab(str) {
      if (str && str !== '') {
        var newStr = JSON.stringify(str) // JSON.parse(JSON.stringify(str))
        var strToObj = newStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        const obj = JSON.parse(strToObj);
        return obj
      }
    }
  }
}
</script>
