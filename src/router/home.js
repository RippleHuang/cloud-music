
/* 我的页面 */
const CompileSongList = () => import(/* webpackChunkName: "homeCompile" */ 'views/homeIndex/CompileSongList')
const MyRadio = () => import(/* webpackChunkName: "homeMyRadio" */ 'views/homeIndex/MyRadio')
const MyFavorite = () => import(/* webpackChunkName: "homeMyFavorite" */ 'views/homeIndex/MyFavorite')
export default [
  {
    path: '/compilesonglist/:id/:title/:description',
    name: 'compilesonglist',
    component: CompileSongList,
    props: true
  },
  {
    path: '/myradio',
    component: MyRadio
  },
  {
    path: '/myfavorite',
    component: MyFavorite
  }
]
