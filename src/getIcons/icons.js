// 我的页面icon列表
const homeIcons = [{
  text: '云村正能量',
  icon: 'iconfont icon-shumulu'
},
{
  text: '猜歌挑战',
  icon: 'iconfont icon-gudianyinle'
},
{
  text: '爵士电台',
  icon: 'iconfont icon-jue'
},
{
  text: '节奏战争',
  icon: 'iconfont icon-jiezou'
},
{
  text: '私藏推荐',
  icon: 'iconfont icon-xindong'
},
{
  text: 'Sati空间',
  icon: 'iconfont icon-shuimianmoshi'
},
{
  text: '最嗨电音',
  icon: 'iconfont icon-dianyin'
},
{
  text: '因乐交友',
  icon: 'iconfont icon-jiaoyou'
},
{
  text: '亲子频道',
  icon: 'iconfont icon-qinzi'
},
{
  text: '古典专区',
  icon: 'iconfont icon-gangqin'
},
{
  text: '跑步FM',
  icon: 'iconfont icon-paobu'
},
{
  text: '小冰电台',
  icon: 'iconfont icon-maike'
},
{
  text: '爵士电台',
  icon: 'iconfont icon-jue'
},
{
  text: '驾驶模式',
  icon: 'iconfont icon-ic-normal-car'
},
{
  text: '编辑',
  icon: 'iconfont icon-bianji'
}
]

// 发现页面icon列表
const findIcons = [{
  text: '每日推荐',
  icon: 'iconfont icon-meirituijian',
  linkTo: 'dateRecommend'
},
{
  text: '歌单',
  icon: 'iconfont icon-gedan1',
  linkTo: 'recommend'
},
{
  text: '排行榜',
  icon: 'iconfont icon-paihangbang',
  linkTo: 'idx'
},
{
  text: '电台',
  icon: 'iconfont icon-diantai',
  linkTo: 'dj'
},
{
  text: '私人FM',
  icon: 'iconfont icon-FM',
  linkTo: 'personalFm'
}]

export default {
  homeIcons,
  findIcons
}

export const FindIcons = () => findIcons
export const HomeIcons = () => homeIcons
