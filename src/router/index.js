import Vue from 'vue'
import VueRouter from 'vue-router'
import FindIndex from 'views/findIndex/FindIndex'

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
    component: () => import(/* webpackChunkName: "home" */ 'views/homeIndex/HomeIndex')
  },
  {
    path: '/village',
    name: 'VillageIndex',
    component: () => import(/* webpackChunkName: "village" */ 'views/villageIndex/VillageIndex')
  },
  {
    path: '/video',
    name: 'VideoIndex',
    component: () => import(/* webpackChunkName: "video" */ 'views/videoIndex/VideoIndex'),
    redirect: '/video/recommend',
    children: [{
      path: '/video/recommend',
      component: () => import(/* webpackChunkName: "recommend" */ 'views/videoIndex/pages/Recommend')
    }, {
      path: '/video/listenBgm',
      component: () => import(/* webpackChunkName: "listenBgm" */ 'views/videoIndex/pages/ListenBgm')
    }, {
      path: '/video/life',
      component: () => import(/* webpackChunkName: "life" */ 'views/videoIndex/pages/Life')
    }, {
      path: '/video/dance',
      component: () => import(/* webpackChunkName: "dance" */ 'views/videoIndex/pages/Dance')
    }, {
      path: '/video/acg',
      component: () => import(/* webpackChunkName: "acg" */ 'views/videoIndex/pages/Acg')
    }, {
      path: '/video/plaza',
      component: () => import(/* webpackChunkName: "plaza" */ 'views/videoIndex/pages/Plaza')
    }, {
      path: '/video/game',
      component: () => import(/* webpackChunkName: "game" */ 'views/videoIndex/pages/Game')
    }]
  },
  {
    path: '/search',
    name: 'SearchIndex',
    component: () => import(/* webpackChunkName: "search" */ 'views/searchIndex/SearchIndex')
  }
]

const router = new VueRouter({
  routes
})

export default router
