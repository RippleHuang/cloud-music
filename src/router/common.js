/* 首页 */
import Default from 'views/default/Default'

const HomeIndex = () => import(/* webpackChunkName: "home" */ 'views/homeIndex/HomeIndex')
const VillageIndex = () => import(/* webpackChunkName: "village" */ 'views/villageIndex/VillageIndex')
const FindIndex = () => import(/* webpackChunkName: "find" */ 'views/findIndex/FindIndex')
const VideoIndex = () => import(/* webpackChunkName: "videoIndex" */ 'views/videoIndex/VideoIndex')
export default [
/* 默认显示发现页面 */
  {
    path: '/',
    component: Default,
    redirect: '/find',
    children: [
      {
        path: '/home',
        component: HomeIndex
      },
      {
        path: '/find',
        component: FindIndex
      },
      {
        path: '/village',
        component: VillageIndex
      },
      {
        path: '/video',
        component: VideoIndex
      }
    ]
  }
]
