// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import Index from 'components/page/index/index.vue'

// 挂载api到vue的原型对象上
import api from './api/index'
Vue.prototype.http = api
// import axios from 'axios'
// axios.defaults.baseURL = '//elm.cangdu.org'
// Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Index },
  store,
  template: '<index/>'
})
