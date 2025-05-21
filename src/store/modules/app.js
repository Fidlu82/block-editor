
import axios from 'axios'
// import Vue from 'vue'

const state = {
  loading: false,
  refCount: 0,
  symbolList: [],
  selectedSymbol: [],
  blocks: [],
  blocksLoaded: 'manual',
  selectedItem: {},
  imagesList: [],
  dictionary: []
  // locale: "en",
  // readJson: 'manual'
}

const getters = {
  symbolList: state => state.symbolList,
  selectedSymbol: state => state.selectedSymbol,
  blocks: state => state.blocks,
  blocksLoaded: state => state.blocksLoaded,
  selectedItem: state => state.selectedItem,
  imagesList: state => state.imagesList,
  dictionary:state => state.dictionary
  // readJson: state => state.readJson,
}

const actions = {
  // set_locale({ commit }, value) {
  //   commit("SET_LOCALE", value);
  // },
  get_symbols ({ state, commit, rootState }, payload) {
    commit("app/SET_LOADING", true, {root: true});
    axios
      .post(
        "get_symbols.php"
      )
      .then(results => {
        commit("LOAD_SYMBOLS", results.data.data);
        // commit("SET_ICONS", results.data.icons);
        commit("app/SET_LOADING", false, {root: true});
      });
  },
  get_dictionary ({ state, commit, rootState }, payload) {
    commit("app/SET_LOADING", true, {root: true});
    axios
      .post(
        "get_dictionary.php"
      )
      .then(results => {
        commit("LOAD_DICTIONARY", results.data.data);
        // commit("SET_ICONS", results.data.icons);
        commit("app/SET_LOADING", false, {root: true});
      });
  },
  get_template_witch_db ({ commit }, payload) {
    commit("app/SET_LOADING", true, {root: true});
    commit('app/SET_SELECTED_SYMBOL', this.inputSelect, {root: true})
    axios
      .post(
        "get_template_json.php", {
          ...payload
        }
      )
      .then(results => {
        commit("app/LOAD_BLOCKS_WITH_DB", results.data.data, {root: true});
        // commit("SET_ICONS", results.data.icons);
        commit("app/SET_LOADING", false, {root: true});
      });
  },
  send_template ({ commit }, payload) {
    commit("app/SET_LOADING", true, {root: true});
    commit("app/LOAD_BLOCKS_WITH_DB", JSON.parse(payload.blocks), {root: true});
    axios
      .post(
        "set_template_json.php", {
          ...payload
        }
      )
      .then(results => {
        // commit("app/LOAD_BLOCKS_WITH_DB", results.data.data, {root: true});
        // commit("SET_ICONS", results.data.icons);
        commit("app/SET_LOADING", false, {root: true});
      });
  },
  get_images_list ({ commit }, payload) {
    commit("app/SET_LOADING", true, {root: true});

    axios
      .post(
        process.env.VUE_APP_LIB_API + "get_images_list.php", {
          ...payload
        }
      )
      .then(results => {
        commit("app/LOAD_IMAGES_LIST", results.data.data, {root: true});
        // commit("SET_ICONS", results.data.icons);
        commit("app/SET_LOADING", false, {root: true});
      });
  }
}

const mutations = {
  // SET_LOCALE(state, value) {
  //   state.locale = value;
  // },
  SET_LOADING(state, loading) {
    if (loading) {
      state.refCount++;
      state.loading = loading;
    } else {
      state.refCount--;
      state.loading = loading;
    }
    state.loading = state.refCount == 0 ? false : true;
  },
  LOAD_SYMBOLS (state, payload) {
    state.symbolList = payload;
  },
  LOAD_DICTIONARY (state, payload) {
    state.dictionary = payload;
  },
  LOAD_BLOCKS_WITH_DB(state, payload) {
    state.selectedItem = {}
    state.blocksLoaded = 'loaded'
    // console.log(payload)
    if (payload) {
      if (typeof(payload) === 'string') {
        state.blocks = JSON.parse(payload)
      } else if (typeof(payload) === 'object') {
        state.blocks = JSON.parse(JSON.stringify(payload))
      }
    } else {
      state.blocks = []
    }

  },
  SET_BLOCKS_MANUAL (state, payload) {
    state.blocks = JSON.parse(JSON.stringify(payload))
  },
  SET_TEMPLATE_LOADED (state, payload) {
    state.blocksLoaded = payload
  },
  SET_SELECTED_SYMBOL (state, payload) {
    state.selectedSymbol = payload
  },
  // SET_ICONS (state, payload) {
  //   if (payload && payload.length>0) {
  //     state.icons = payload;
  //   }
  // },
  // SET_SELECTED_ICONS (state, payload) {
  //   state.selectedIcons = payload;
  // },
  LOAD_IMAGES_LIST (state, payload) {
    state.imagesList = payload;
  },
  ADD_BLOCK (state, payload) {
    var index = payload[0]
    var block = payload[1]
    if (payload[0] === 0) {
      state.blocks.unshift(block)
    } else if (payload[0] === Object.keys(state.blocks).length) {
      state.blocks.push(block)
    } else {
      state.blocks.splice((index), 0, block)
    }
  },
  REMOVE_BLOCK (state, payload) {
    // if (Object.keys(this.blocks).length>0) {
    //   this.selectedBlockIndex = 0;
    // } else{
    //   this.selectedBlockIndex = null;
    // }
    state.blocks.splice(payload, 1);
    state.selectedItem = {}
  },
  MOVE_BLOCK (state, payload) {
    var index = payload[0]
    var direction = payload[1]
    const newIndex = index + direction;
    const block = state.blocks.splice(index, 1)[0];
    state.blocks.splice(newIndex, 0, block);
  },
  UPDATE_BLOCKS (state, payload) {
    state.blocks = JSON.parse(JSON.stringify(payload))
  },
  SET_ITEM_SELECTED (state, payload) {
    state.selectedItem = payload
  },
  SET_BLOCK_CONTENT (state, payload) {
    var index = payload[0]
    var key = payload[1]
    var value = payload[2]
    state.blocks[index][key] = value

    if (value === 'header') {
      state.blocks[index]['header'] = { type: 'h1', text: '', style: {fontWeight: 'normal', fontStyle: 'normal', color: '#000000', fontSize: '20px', textAlign: 'center', padding: '5px', margin: '10px'}}
    }
    else if (value === 'paragraphs') {
      state.blocks[index]['paragraphs'] = []
      state.blocks[index]['paragraphsGroupStyle'] = {padding: '0px', margin: '0px', textAlign: 'center', display:'block'}
    }
    else if (value === 'lists') {
      state.blocks[index]['lists'] = {structure: { id: Date.now(), items: [{row: { id: Date.now(), value: "", style: {padding:'6px'}}, style: {}}] }, style: {padding:'6px', listStyle: "circle"}}
    }
    else if (value === 'images') {
      state.blocks[index]['images'] = []
      state.blocks[index]['imagesGroupStyle'] = {padding: '0px', margin: '0px', textAlign: 'left', display:'block', justifyContent: 'left'}
    }
    else if (value === 'table') {
      state.blocks[index]['table'] = {
        structure: {
          rows: [
            [{cell: { value: "11", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "21", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "31", style: {padding:'6px'} }, type: 'text', style: {}}],
            [{cell: { value: "12", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "22", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "32", style: {padding:'6px'} }, type: 'text', style: {}}],
            [{cell: { value: "13", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "23", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "33", style: {padding:'6px'} }, type: 'text', style: {}}]
          ],
          style: {}
        },
        style: {margin: "0px auto", padding: "10px", width: "100%"}
      }
    }
    else if (value === 'table') {
      state.blocks[index]['newpage'] = true
    }

  },
  SET_BLOCK_VALUE (state, payload) {
    console.log('--- SET_BLOCK_VALUE ---')
    var index = payload[0]
    var key = payload[1]
    var value = payload[2]
    console.log(index)
    console.log(key)
    console.log(value)

    // var keys = key.split(".");
    // console.log(keys)

    state.blocks[index][key] = JSON.parse(JSON.stringify(value))

    // if (keys.length === 1) {
    //   state.blocks[index] = {
    //     ...state.blocks[index],
    //     [keys[0]]: value
    //   };
    // }

  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
