import Vue from 'vue'
import VueRouter from 'vue-router'
import common from './common'
import home from './home'
import find from './find'
import search from './search'
import login from './login'
import user from './user'

Vue.use(VueRouter)

const ShowSong = () => import(/* webpackChunkName: "showsong" */ 'views/default/ShowSong')
const Landscape = () => import(/* webpackChunkName: "landscape" */ 'views/videoIndex/Landscape')
const routes = [
  ...common,
  ...home,
  ...find,
  ...search,
  ...login,
  ...user,
  {
    path: '/showsong',
    component: ShowSong
  },
  {
    path: '/landscape',
    component: Landscape
  }
]

const router = new VueRouter({
  routes
})

export default router
