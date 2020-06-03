/* 云村页面 */
const VillageIndex = () => import(/* webpackChunkName: "village" */ 'views/villageIndex/VillageIndex')
export default [
  {
    path: '/village',
    component: VillageIndex
  }
]
