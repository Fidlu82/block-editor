
import axios from 'axios'
// import Vue from 'vue'

const state = {
  list_attributes: [],
  list_attributes_more: [],
  list_parametrs: [],
  list_products: {},
  selected_category: [],
  attr_category: [],
  query: [],
  selected_fileds: [],
  clear: false,
  dataValue: [],
  attributes_active:[],
  selectedFilters:[],
  attributes_position: 'vertical',
  tree: [],
  tree_more: [],
  comparisonList: [],
  parametrsProducts: []
}

const getters = {
  list_attributes: state => state.list_attributes,
  list_attributes_more: state => state.list_attributes_more,
  list_products: state => state.list_products,
  dataValue: state => state.dataValue,
  attributes_active: state => state.attributes_active,
  selectedFilters: state => state.selectedFilters,
  attributes_position: state => state.attributes_position,
  tree: state => state.tree,
  tree_more: state => state.tree_more,
  comparisonList: state => state.comparisonList,
  parametrsProducts: state => state.parametrsProducts
}

const actions = {
  load_attributes({ commit, rootState }, payload) {
    commit("app/SET_LOADING", true, {root: true});

    let data = []
    // const params = new URLSea rchParams();
    axios
      .post(
        "get_attributes.php", {
          data,
          param: '',
          category: process.env.VUE_APP_CATEGORY,
          lang: rootState.app.locale
        }
      )
      // .then(r => r.data)
      .then(results => {
        commit("LOAD_ATTRIBUTES", {data: results.data.data, param: results.data.selectedAttr});
        commit("LOAD_PRODUCTS", results.data.products);
        commit("LOAD_TREE", results.data.tree);
        commit('SET_COMPARISONS', null)
        commit("app/SET_LOADING", false, {root: true});
        // state.clear = false;
        var i=1
        var filtresArray = []
        Object.keys(results.data.data).forEach(element => {
          if (results.data.data[element].group) {
            if (i < 7) {
              if (!filtresArray.includes(results.data.data[element].group)) {
                filtresArray.push(results.data.data[element].group)
                i++
              }
            }
          } else {
            if (i < 7) {
              filtresArray.push(element)
            }
            i++
          }
        });
        commit("SET_SELECTED_FILTERS", filtresArray);
      });
  },
  set_data_values({ state, commit , rootState }, payload) {
    console.log('--- set_data_values ---')
    commit("app/SET_LOADING", true, {root: true});
    var keyTab = Object.keys(payload)
    let data = Object.assign({}, state.dataValue)

    if (keyTab[0])
    {
      if (payload[keyTab[0]]['values'].length>0) {
        commit("SET_DATA_VALUE_KEY", [keyTab[0], Object.assign({}, payload[keyTab[0]])])
        data = Object.assign({}, state.dataValue)
        console.log('add item')
      } else {
        commit("DELETE_DATA_VALUE", keyTab[0])
        data = Object.assign({}, state.dataValue)
        console.log('remove item')
      }
    }

    commit("SET_ATTRIBUTES_ACTIVE", JSON.parse(JSON.stringify(data)))

    axios
      .post(
        "get_attributes.php", {
          data,
          param: keyTab[0],
          category: process.env.VUE_APP_CATEGORY,
          lang: rootState.app.locale
        })
      .then(results => {
        commit("LOAD_ATTRIBUTES", {data: results.data.data, param: results.data.selectedAttr});
        commit("LOAD_PRODUCTS", results.data.products);
        commit("LOAD_TREE", results.data.tree);
        commit('SET_COMPARISONS', null)
        commit("app/SET_LOADING", false, {root: true});
      });
  },

  delete_data_values({ state, commit , rootState }, payload) {
    console.log('--- delete_data_values ---')
    commit("app/SET_LOADING", true, {root: true});
    var keyTab = Object.keys(payload)
    let data = Object.assign({}, state.dataValue)
    let arrayValue = (payload[keyTab[0]].values[0])

    if (payload[keyTab[0]]['values'].length>1) {
      // console.log('remove item multi')
      commit("DELETE_DATA_VALUE_ARRAY", [keyTab[0], arrayValue])
    } else {
      // console.log('remove item single')
      commit("DELETE_DATA_VALUE", keyTab[0])
    }

    data = Object.assign({}, state.dataValue)
    console.log('remove item')

    commit("SET_ATTRIBUTES_ACTIVE", JSON.parse(JSON.stringify(data)))

    axios
      .post(
        "get_attributes.php", {
          data,
          param: keyTab[0],
          category: process.env.VUE_APP_CATEGORY,
          lang: rootState.app.locale
        })
      .then(results => {
        commit("LOAD_ATTRIBUTES", {data: results.data.data, param: results.data.selectedAttr});
        commit("LOAD_PRODUCTS", results.data.products);
        commit("LOAD_TREE", results.data.tree);
        commit('SET_COMPARISONS', null)
        commit("app/SET_LOADING", false, {root: true});
      });
  },

  get_data_values({ state, commit , rootState }, payload) {
    // console.log('get_data_values')
    commit("app/SET_LOADING", true, {root: true})
    // var keyTab = Object.keys(payload)
    // let data = Object.assign({}, state.dataValue)

    // commit("DELETE_DATA_VALUE", keyTab[0])
    // data = Object.assign({}, state.dataValue)
    // console.log('remove item')

    // commit("SET_COMPARISON_PARAMETRS", JSON.parse(JSON.stringify(data)))

    axios
      .post(
        "https://app.pulsar.pl/query_cennik/comparion_products.php",{
          products: payload,
          lang: rootState.app.locale,
          category: process.env.VUE_APP_CATEGORY
        }
      )
      .then(results => {
        // console.log(results.data)
        commit("SET_COMPARISON_PARAMETRS", results.data)
        // commit("LOAD_PRODUCTS", results.data.products);
        // commit("LOAD_TREE", results.data.tree);
        commit("app/SET_LOADING", false, {root: true})
      });
  },


  //=========================================================================================================
  async load_products({ state, commit, rootState }, payload) {

      // let categories = [];
      // categories = state.selected_category;

      const params = new URLSearchParams();
      // params.append("lang", rootState.app.locale);
      // params.append("categories", JSON.stringify(payload.categories));
      // params.append("attributes", JSON.stringify(payload.attributes));
      // params.append("products", JSON.stringify(payload.products));
      // params.append("attrManual", payload.attrManual);
      // params.append("clickedField", payload.clickedField);

      // console.log('params', params)

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit("app/SET_LOADING", true, {root: true});

          const params = new URLSearchParams();
          params.append("lang", rootState.app.locale);
          params.append("categories", JSON.stringify(payload.categories));
          params.append("attributes", JSON.stringify(payload.attributes));
          params.append("products", JSON.stringify(payload.products));
          params.append("query", "");
          // params.append("attrManual", payload.attrManual);
          // params.append("clickedField", payload.clickedField);

          axios
            // .get("get_symbol_data_for_search.php", {
            // .post("get_products_by_query.php", // {
            .post("get_products_by_category.php", {
              params
              // params: {
                // queary: JSON.stringify(query),
                // attributes: [],
                // categories: JSON.stringify(category),
                // lang: state.locale,
                // group: payload.group
              // }
            }
            )
            .then(r => r.data)
            .then(list_products => {
            });
          resolve();
        }, 500);
      });
    },
}

// Object.values(payload.param).forEach(param => {
//   if (element !== param) {
//     // console.log(param, element)
//     state.list_attributes[element] = JSON.parse(JSON.stringify(payload.data[element]))
//   } else {
//     console.log(param, element)
//   }
// })

const mutations = {
  LOAD_ATTRIBUTES(state, payload) {
    if (payload.param && payload.param.length>0) {
      Object.keys(payload.data).forEach(element => {

        // Object.values(payload.param).forEach(param => {
        //   if (element !== param) {
        //     // console.log(param, element)
        //     state.list_attributes[element] = JSON.parse(JSON.stringify(payload.data[element]))
        //   } else {
        //     console.log(param, element)
        //   }
        // })

        // if (element !== payload.param) {
        if (!payload.param.includes(element)) {
          state.list_attributes[element] = JSON.parse(JSON.stringify(payload.data[element]))
        }

      });
    } else {
      state.list_attributes = JSON.parse(JSON.stringify(payload.data))
    }
  },
  LOAD_ATTRIBUTES_MORE(state, payload) {
    if (payload.param && payload.param.length>0) {
      Object.keys(payload.data).forEach(element => {
        // if (element !== payload.param) {
        //   state.list_attributes_more[element] = JSON.parse(JSON.stringify(payload.data[element]))
        // }
        if (!payload.param.includes(element)) {
          state.list_attributes[element] = JSON.parse(JSON.stringify(payload.data[element]))
        }
      });
    } else {
      state.list_attributes_more = JSON.parse(JSON.stringify(payload.data))
    }
  },
  SET_CATEGORIES(state, payload) {
    state.selected_category = []
    state.selected_category = JSON.parse(JSON.stringify(payload))
  },
  SET_ATTRIBUTES(state, payload) {
    state.attr_category = []
    state.attr_category = JSON.parse(JSON.stringify(payload))
  },
  LOAD_PRODUCTS(state, payload) {
    state.list_products = payload
  },
  LOAD_TREE (state, payload) {
    if(payload) {
      state.tree = JSON.parse(JSON.stringify(payload))
    }
  },
  LOAD_TREE_MORE (state, payload) {
    if(payload) {
      state.tree_more = JSON.parse(JSON.stringify(payload))
    }
  },
  SET_FIELDS_ACTIVE(state, payload) {
    state.selected_fileds = payload
    // console.log(state.attributes_active);
  },
  SET_SELECTED_FILTERS(state, payload) {
    state.selectedFilters = JSON.parse(JSON.stringify(payload))
  },
  SET_COUNTER(state, payload) {
    state.list_count_products = [];
    state.list_count_products.push(payload);
    // state.list_count_products.push(payload);
    // console.log(state.list_count_products);
    //     fieldID: self.fields.id,
    // fieldCNT: self.counter
  },
  SET_ATTRIBUTES_ACTIVE (state, payload) {
    state.attributes_active = payload
  },
  SET_POSITION_FILTERS (state, payload) {
    state.attributes_position = payload
  },
  SET_COMPARISONS (state, payload) {
    if (payload === null) {
      state.comparisonList = []
    } else {
      if (state.comparisonList.includes(payload)) {
        // removeItem(payload, state.comparisonList);
        var index = state.comparisonList.indexOf(payload);
        if (index !== -1) {
          state.comparisonList.splice(index, 1);
        }
      } else {
        state.comparisonList.push(payload)
      }
    }
  },
  SET_COMPARISON_PARAMETRS (state, payload) {
    state.parametrsProducts = JSON.parse(JSON.stringify(payload))
  },
  DELETE_ITEM_CLIPBOARD (state, payload) {
    for(var i in state.attributes_active[payload[0]]['values']){
      if(state.attributes_active[payload[0]]['values'][i]==payload[1]){
          state.attributes_active[payload[0]]['values'].splice(i,1);
          break;
      }
    }
    if (state.attributes_active[payload[0]]['values'].length == 0 ){
      delete state.attributes_active[payload[0]];
    }
    JSON.parse(JSON.stringify(state.attributes_active))
  },
  SET_DATA_VALUE (state, payload) {
    state.dataValue = JSON.parse(JSON.stringify(payload))
  },
  DELETE_DATA_VALUE (state, payload) {
    delete state.dataValue[payload];
  },
  DELETE_DATA_VALUE_ARRAY (state, payload) {
    state.dataValue[payload[0]]['values'].forEach(function (item, index, object) {
      if (JSON.stringify(item)==JSON.stringify(payload[1])) {
        object.splice(index, 1);
        state.dataValue[payload[0]]['translationChild'].splice(index, 1);
        console.log('delete element')
      }
    })

    // state.dataValue[payload[0]]['values'][payload[1]];
  },
  SET_DATA_VALUE_KEY (state, payload) {
    state.dataValue[payload[0]] = JSON.parse(JSON.stringify(payload[1]))
  },
  //============================================= CLEAR
  CLEAR_DATA(state) {
    state.list_attributes = {};
    state.list_parametrs = {};
    state.list_products = {};
    // state.query = [];
    // state.loading_products = true;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    app
  }
}
