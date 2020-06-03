/* 视频页面 */
const VideoIndex = () => import(/* webpackChunkName: "videoIndex" */ 'views/videoIndex/VideoIndex')
const Recommend = () => import(/* webpackChunkName: "recommend" */ 'views/videoIndex/pages/Recommend')
const ListenBgm = () => import(/* webpackChunkName: "listenBgm" */ 'views/videoIndex/pages/ListenBgm')
const Life = () => import(/* webpackChunkName: "life" */ 'views/videoIndex/pages/Life')
const Dance = () => import(/* webpackChunkName: "dance" */ 'views/videoIndex/pages/Dance')
const Acg = () => import(/* webpackChunkName: "acg" */ 'views/videoIndex/pages/Acg')
const Plaza = () => import(/* webpackChunkName: "plaza" */ 'views/videoIndex/pages/Plaza')
const Game = () => import(/* webpackChunkName: "game" */ 'views/videoIndex/pages/Game')
export default [
  {
    path: '/video',
    name: 'VideoIndex',
    component: VideoIndex,
    redirect: '/video/recommend',
    children: [{
      path: '/video/recommend',
      component: Recommend
    }, {
      path: '/video/listenBgm',
      component: ListenBgm
    }, {
      path: '/video/life',
      component: Life
    }, {
      path: '/video/dance',
      component: Dance
    }, {
      path: '/video/acg',
      component: Acg
    }, {
      path: '/video/plaza',
      component: Plaza
    }, {
      path: '/video/game',
      component: Game
    }]
  }
]
