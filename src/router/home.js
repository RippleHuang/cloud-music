
/* 我的页面 */
const HomeIndex = () => import(/* webpackChunkName: "home" */ 'views/homeIndex/HomeIndex')
export default [
  {
    path: '/home',
    component: HomeIndex
  }
]
