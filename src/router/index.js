import Vue from 'vue'
import VueRouter from 'vue-router'
import FindIndex from '../views/findIndex/FindIndex'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/find' },
  {
    path: '/find',
    name: 'FindIndex',
    component: FindIndex
  },
  {
    path: '/home',
    name: 'HomeIndex',
    component: () => import(/* webpackChunkName: "home" */ '../views/homeIndex/HomeIndex')
  },
  {
    path: '/friend',
    name: 'FriendIndex',
    component: () => import(/* webpackChunkName: "friend" */ '../views/friendIndex/FriendIndex')
  },
  {
    path: '/video',
    name: 'VideoIndex',
    component: () => import(/* webpackChunkName: "video" */ '../views/videoIndex/VideoIndex')
  },
  {
    path: '/search',
    name: 'SearchIndex',
    component: () => import(/* webpackChunkName: "search" */ '../views/searchIndex/SearchIndex')
  }
]

const router = new VueRouter({
  routes
})

export default router
