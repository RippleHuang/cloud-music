/* 发现页面 */
const FindIndex = () => import(/* webpackChunkName: "find" */ 'views/findIndex/FindIndex')
export default [
  {
    path: '/find',
    component: FindIndex
  }
]
