<template>
  <div id="app">
    <div style="width:100%; display:block">
      <select id="inputSelect" v-model="inputSelect" @change="changeInput()">
        <option value='null'>wybierz symbol</option>
        <option v-for="symbol in symbols" :value="symbol" :key="symbol['idsymbol']">{{symbol['symbol']}}</option>
      </select>
      <button @click="showDialog = true">wczytaj z tekstu</button>
      <button @click="saveJson()" v-if="Object.keys(strJson).length>0">zapisz szablon</button>
    </div>
    <div class="content" style="display: flex;">
      <div class="col-left">
        <BlocksEditor/>
      </div>
      <div class="col-right">
        <ViewTemplate/>
      </div>
    </div>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Wklej do okna</md-dialog-title>
      <textarea v-model="passJsonText" style="width: 500px;  min-height: 500px;  margin: 16px;"></textarea>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">zamknij</md-button>
        <md-button class="md-primary" @click="showDialog = false, saveJsonText()">zapisz</md-button>
      </md-dialog-actions>
    </md-dialog>

    {{ strJson }}

    <!-- <DragDrop/> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BlocksEditor from './components/BlocksEditor'
import ViewTemplate from './components/ViewTemplate'
import DragDrop from './components/DragDrop2'

export default {
  name: 'App',
  data () {
    return {
      inputSelect: null,
      passJsonText: '',
      showDialog: false
    }
  },
  components: {
    BlocksEditor, ViewTemplate, DragDrop
  },
  computed: {
    ...mapGetters('app', ['symbols', 'strJson', 'symbol']) // , 'descTemplate', 'icons','selectedIcons'])
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
      // console.log(this.inputSelect)
      // this.$store.commit('app/CLEAR_DESC')
      // this.inputDesc = ''
      // this.$store.commit('app/SET_INPUT_LANGUAGE', this.inputLang)
      if (this.inputSelect && Object.keys(this.inputSelect).length>0) {
        this.$store.dispatch('app/get_template_json', this.inputSelect)
        this.$store.commit('app/SET_INPUT_SYMBOL', this.inputSelect)
      }
      // this.inputIcons = []
      // this.$store.commit("app/SET_SELECTED_ICONS", []);
    },
    saveJsonText () {
      console.log(this.passJsonText)
      this.$store.commit('app/LOAD_JSON_TEMPLATE', this.passJsonText)
    },
    saveJson () {
      this.$store.dispatch('app/set_template_json', Object.assign(this.inputSelect, {template: JSON.stringify(this.strJson)}))
    }
  },
  created() {
    this.getSymbols()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: block;
}
.col-left {
  /* 845x1195*/
  width: 60%;
  display: inline;
  padding: 10px;
}
.col-right {
  width: 40%;
  padding: 10px;
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
