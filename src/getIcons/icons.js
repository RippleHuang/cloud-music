// 我的页面icon列表
const findIcons = [{
  text: '每日推荐',
  icon: 'iconfont icon-meirituijian',
  linkTo: 'dateRecommend'
}, {
  text: '歌单',
  icon: 'iconfont icon-gedan1',
  linkTo: 'recommend'
}, {
  text: '排行榜',
  icon: 'iconfont icon-paihangbang',
  linkTo: 'idx'
}, {
  text: '电台',
  icon: 'iconfont icon-diantai',
  linkTo: 'dj'
}, {
  text: '私人FM',
  icon: 'iconfont icon-zhibo',
  linkTo: 'personalFm'
}]

export default {
  findIcons
}

export const FindIcons = () => findIcons
