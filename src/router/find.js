/* 发现页面 */
const Recommend = () => import(/* webpackChunkName: "find-recommend" */ 'views/findIndex/Recommend')
const SongListSquare = () => import(/* webpackChunkName: "find-songListSquare" */ 'views/findIndex/SongListSquare')
const NewSongs = () => import(/* webpackChunkName: "find-newSongs" */ 'views/findIndex/NewSongs')
const MoreNewPlate = () => import(/* webpackChunkName: "find-moreNewPlate" */ 'views/findIndex/MoreNewPlate')
const RankingList = () => import(/* webpackChunkName: "find-rankingList" */ 'views/findIndex/RankingList')
export default [
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/songlistsquare',
    component: SongListSquare
  },
  {
    path: '/newsongs',
    component: NewSongs
  },
  {
    path: '/newplates',
    component: MoreNewPlate
  },
  {
    path: '/rankinglist',
    component: RankingList
  }
]
