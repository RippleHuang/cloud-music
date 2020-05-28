import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './utils/rem.js'
import './assets/styles/reset.css'
import './assets/styles/global.scss'
import './assets/fonts/iconfont.css'
import './plugins/vant.js'

Vue.config.productionTip = false

fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
