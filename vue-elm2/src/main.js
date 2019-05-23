// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
// 在不同的移动终端设备中实现，UI设计稿的等比例适配。
import './assets/js/rem.js'

// 挂载api到vue的原型对象上
import api from './api/index'
Vue.prototype.http = api
import axios from 'axios'
Vue.prototype.API1 = '/api'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
