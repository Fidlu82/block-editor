// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from "vuex";
import VueAxios from "vue-axios";
import axios from "axios";
import store from './store'

Vue.config.productionTip = false
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'

// Vue.use(Buefy)
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueMaterial)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
