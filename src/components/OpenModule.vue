<template>
  <div id="OpenModule">
    <!-- {{ selectedItem }} -->
    <!-- <br><br>
    {{ blocks }}
    <br><br> -->

    <select id="inputSelect" v-model="inputSelect" @change="changeInput()">
      <option value='null'>wybierz symbol</option>
      <option v-for="symbol in symbolList" :value="symbol" :key="symbol['idsymbol']">{{symbol['symbol']}}</option>
    </select>
    <label for="">{{ selectedSymbol }}</label>
    <button @click="showDialog = true">wczytaj z tekstu</button>
    <button @click="saveTemplateJson()" v-if="blocks && Object.keys(blocks).length>0">zapisz szablon</button>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Wklej do okna</md-dialog-title>
      <textarea v-model="templateText" style="width: 500px;  min-height: 500px;  margin: 16px;"></textarea>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">zamknij</md-button>
        <md-button class="md-primary" @click="showDialog = false, setTemplateWithText()">zapisz</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { helpers } from '../mixins/helpers'

export default {
  name: 'OpenModulePage',
  mixins: [helpers],
  data () {
    return {
      inputSelect: null,
      templateText: '',
      showDialog: false
    }
  },
  computed: {
    ...mapGetters('app', ['symbolList', 'selectedSymbol', 'selectedItem', 'blocks']) // 'strJson' , 'descTemplate', 'icons','selectedIcons'])
  },
  watch: {
    symbol (newValue) {
      if (newValue.length == 0) {
        // this.inputSelect = null
      }
    }
  },
  methods: {
    getSymbols() {
       this.$store.dispatch("app/get_symbols");
    },
    changeInput () {
      if (this.inputSelect && Object.keys(this.inputSelect).length>0) {
        this.$store.commit('app/SET_SELECTED_SYMBOL',this.inputSelect ) // this.templateText)
        this.$store.dispatch('app/get_template_witch_db', this.inputSelect)
      }
      // this.inputIcons = []
      // this.$store.commit("app/SET_SELECTED_ICONS", []);
    },
    setTemplateWithText () {
      if (this.isValidJSON (this.templateText)) {
        // console.log(this.templateText)
        this.$store.commit('app/LOAD_BLOCKS_WITH_DB',this.templateText ) // this.templateText)
      }
    },
    saveTemplateJson () {
      this.$store.dispatch('app/send_template', Object.assign(this.inputSelect, {blocks: JSON.stringify(this.blocks)}))
    }
  },
  created() {
    this.getSymbols()
  }
}
</script>

<style>
#OpenModule {
  width:100%; display:block
}
#inputSelect {
  width:200px;
  padding:4px 10px;
  margin: 10px;
}
#inputLanguage {
  margin: 10px;
}
</style>
