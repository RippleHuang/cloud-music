import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './home'
import find from './find'
import village from './village'
import video from './video'
import search from './search'
import login from './login'
import Default from 'views/default/Default'
Vue.use(VueRouter)

const routes = [
  /* 默认显示发现页面 */
  {
    path: '/',
    component: Default,
    redirect: '/find',
    children: [
      ...home,
      ...find,
      ...village,
      ...video
    ]
  },
  ...search,
  ...login
]

const router = new VueRouter({
  routes
})

export default router
