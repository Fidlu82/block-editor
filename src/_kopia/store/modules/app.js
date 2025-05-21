
import axios from 'axios'
// import Vue from 'vue'

const state = {
  loading: false,
  refCount: 0,
  locale: "en",
  strJson: [],
  symbol: [],
  symbols: [],
  imagesList: [],
  readJson: 'manual'
}

const getters = {
  strJson: state => state.strJson,
  symbols: state => state.symbols,
  symbol: state => state.symbol,
  readJson: state => state.readJson,
  imagesList: state => state.imagesList
}

const actions = {
  set_locale({ commit }, value) {
    commit("SET_LOCALE", value);
  },
  get_symbols ({ state, commit, rootState }, payload) {
    commit("app/SET_LOADING", true, {root: true});

    let data = []
    const params = new URLSearchParams();

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
  get_template_json ({ commit }, payload) {
    commit("app/SET_LOADING", true, {root: true});

    // let data = []
    // const params = new URLSearchParams();

    axios
      .post(
        "get_template_json.php", {
          ...payload
        }
      )
      .then(results => {
        commit("LOAD_BLOCKS", results.data.data);
        // commit("SET_ICONS", results.data.icons);
        commit("app/SET_LOADING", false, {root: true});
      });
  },
  set_template_json ({ commit }, payload) {
    commit("app/SET_LOADING", true, {root: true});

    // let data = []
    // const params = new URLSearchParams();

    axios
      .post(
        "set_template_json.php", {
          ...payload
        }
      )
      .then(results => {
        commit("LOAD_BLOCKS", results.data.data);
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
        commit("LOAD_IMAGES_LIST", results.data.data);
        // commit("SET_ICONS", results.data.icons);
        commit("app/SET_LOADING", false, {root: true});
      });
  }
}

const mutations = {
  SET_LOCALE(state, value) {
    state.locale = value;
  },
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
  LOAD_SYMBOLS(state, payload) {
    state.symbols = payload;
  },
  LOAD_BLOCKS(state, payload) {
    state.readJson = 'wczytane'
    state.strJson = JSON.parse(JSON.stringify(payload))
  },
  SET_BLOCKS_MANUAL (state, payload) {
    state.strJson = JSON.parse(JSON.stringify(payload))
  },
  SET_READ_JSON (state, payload) {
    state.readJson = payload;
  },
  SET_INPUT_SYMBOL(state, payload) {
    state.symbol = payload;
  },
  SET_ICONS (state, payload) {
    if (payload && payload.length>0) {
      state.icons = payload;
    }
  },
  SET_SELECTED_ICONS (state, payload) {
    state.selectedIcons = payload;
  },
  LOAD_IMAGES_LIST (state, payload) {
    state.imagesList = payload;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
