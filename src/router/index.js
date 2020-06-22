import Vue from 'vue'
import VueRouter from 'vue-router'
import home from './home'
import find from './find'
import village from './village'
import video from './video'
import search from './search'
import login from './login'
import user from './user'
import Default from 'views/default/Default'
const ShowSong = () => import(/* webpackChunkName: "showsong" */ 'views/default/ShowSong')
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
  ...login,
  ...user,
  {
    path: '/showsong',
    component: ShowSong
  }
]

const router = new VueRouter({
  routes
})

export default router
