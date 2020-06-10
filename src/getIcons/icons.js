// ======我的页面icon列表======
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
// ======我的页面功能icon列表======
const homeAppIcons = [{
  text: '本地音乐',
  icon: 'iconfont icon-icon-',
  num: 0
},
{
  text: '最近播放',
  icon: 'iconfont icon-zuijinbofang',
  num: 0
},
{
  text: '下载管理',
  icon: 'iconfont icon-xiazai',
  num: 0
},
{
  text: '我的电台',
  icon: 'iconfont icon-diantai',
  num: 0
},
{
  text: '我的收藏',
  icon: 'iconfont icon-wodeshoucang',
  num: 0
}]
// ======侧边弹出层icon列表======
// 头部icon
const popupTopIcons = [{
  text: '我的消息',
  icon: 'iconfont icon-email',
  event: 'no'
},
{
  text: '我的好友',
  icon: 'iconfont icon-haoyou',
  event: 'no'
},
{
  text: '听歌识曲',
  icon: 'iconfont icon-tinggeshiqu',
  event: 'no'
},
{
  text: '个性装扮',
  icon: 'iconfont icon-gexingzhuangban',
  event: 'no'
}]
// 消费icon
const popupShopIcons = [{
  text: '演出',
  icon: 'iconfont icon-piao',
  event: 'no'
},
{
  text: '商城',
  icon: 'iconfont icon-gouwuche',
  event: 'no'
},
{
  text: '附近的人',
  icon: 'iconfont icon-location',
  event: 'no'
},
{
  text: '游戏推荐',
  icon: 'iconfont icon-youxi1',
  event: 'no'
},
{
  text: '口袋彩铃',
  icon: 'iconfont icon-cailing',
  event: 'no'
}]
// 功能icon
const popupAppIcons = [{
  text: '创作者中心',
  icon: 'iconfont icon-dengpao1',
  event: 'no'
},
{
  text: '我的订单',
  icon: 'iconfont icon-wodedingdan',
  event: 'no'
},
{
  text: '定时停止播放',
  icon: 'iconfont icon-dingshi',
  event: 'no'
},
{
  text: '扫一扫',
  icon: 'iconfont icon-sao',
  event: 'no'
},
{
  text: '音乐闹钟',
  icon: 'iconfont icon-naozhong',
  event: 'no'
},
{
  text: '在线听歌免流量',
  icon: 'iconfont icon-zaixiantinggemianliuliang',
  event: 'no'
},
{
  text: '优惠券',
  icon: 'iconfont icon-youhuiquan',
  event: 'no'
},
{
  text: '青少年模式',
  icon: 'iconfont icon-anquan',
  event: 'no'
}]
// 设置icon
const popupBottomIcons = [{
  text: '夜间模式',
  icon: 'iconfont icon-yejian',
  event: 'no'
},
{
  text: '设置',
  icon: 'iconfont icon-shezhi1',
  event: 'no'
},
{
  text: '退出',
  icon: 'iconfont icon-tuichu',
  event: 'loginout'
}]

// ======发现页面icon列表======
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
  findIcons,
  homeAppIcons,
  popupTopIcons,
  popupShopIcons,
  popupAppIcons,
  popupBottomIcons
}

export const FindIcons = () => findIcons
export const HomeIcons = () => homeIcons
export const HomeAppIcons = () => homeAppIcons
export const PopupTopIcons = () => popupTopIcons
export const PopupShopIcons = () => popupShopIcons
export const PopupAppIcons = () => popupAppIcons
export const PopupBottomIcons = () => popupBottomIcons
