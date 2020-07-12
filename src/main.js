import Vue from 'vue'
import App from './App.vue'
import store from 'store'
import { encrypt, decrypt } from 'utils/crypto'
import fastclick from 'fastclick'
import 'plugins/vant.js'
import 'utils/rem'
import 'assets/styles/reset.css'
import 'assets/styles/global.scss'
import router from 'router'

Vue.prototype.$encrypt = encrypt
Vue.prototype.$decrypt = decrypt

Vue.config.productionTip = false

// 移动端0.3s延迟
fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
