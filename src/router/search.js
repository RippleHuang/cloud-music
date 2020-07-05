/* 搜索页面 */
const SearchIndex = () => import(/* webpackChunkName: "search" */ 'views/searchIndex/SearchIndex')
const SearchResult = () => import(/* webpackChunkName: "search-result" */ 'views/searchIndex/SearchResult')
export default [
  {
    path: '/search',
    component: SearchIndex
  },
  {
    path: '/searchresult',
    component: SearchResult
  }
]
