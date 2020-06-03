/* 搜索页面 */
const SearchIndex = () => import(/* webpackChunkName: "search" */ 'views/searchIndex/SearchIndex')
export default [
  {
    path: '/search',
    component: SearchIndex
  }
]
