import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import store from 'store'
import fastclick from 'fastclick'
import 'plugins/vant.js'
import 'utils/rem'
import 'assets/styles/reset.css'
import 'assets/styles/global.scss'

Vue.config.productionTip = false

fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
