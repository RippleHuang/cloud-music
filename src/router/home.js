
/* 我的页面 */
const HomeIndex = () => import(/* webpackChunkName: "home" */ 'views/homeIndex/HomeIndex')
const CompileSongList = () => import(/* webpackChunkName: "homeCompile" */ 'views/homeIndex/CompileSongList')
const MyRadio = () => import(/* webpackChunkName: "homeMyRadio" */ 'views/homeIndex/MyRadio')
const MyFavorite = () => import(/* webpackChunkName: "homeMyFavorite" */ 'views/homeIndex/MyFavorite')
export default [
  {
    path: '/home',
    component: HomeIndex
  },
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
