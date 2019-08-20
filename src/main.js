// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import AMap from 'vue-amap';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './vuex/store'

// import domain from './domain.js';
// global.domain = domain;

// axios.defaults.baseURL =domain.baseUrl;

Vue.prototype.$axios = axios;
Vue.use(VueAxios, axios);
Vue.use(AMap);
Vue.use(Mint)
Vue.use(Vuex)
// axios.defaults.headers.post["Content-type"] = "application/x-www-form-urlencoded"
Vue.config.productionTip = false
AMap.initAMapApiLoader({
  // 高德key
  key: '336c57b9e3679e2b1bfcb4429e2235b7',
  // 插件集合 （插件按需引入）
 plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation'],
 
});
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  });
  
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
