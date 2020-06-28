const recentData = [{
  path: '/video/recommend',
  text: '歌曲'
}, {
  path: '/video/listenBgm',
  text: '直播'
}, {
  path: '/video/life',
  text: '视频'
}, {
  path: '/video/dance',
  text: '歌单'
}, {
  path: '/video/acg',
  text: '专辑'
}, {
  path: '/video/plaza',
  text: '电台'
}]
const videoData = [{
  path: '/video/recommend',
  text: '推荐'
}, {
  path: '/video/listenBgm',
  text: '听BGM'
}, {
  path: '/video/life',
  text: '生活'
}, {
  path: '/video/dance',
  text: '舞蹈'
}, {
  path: '/video/acg',
  text: 'ACG音乐'
}, {
  path: '/video/plaza',
  text: '广场'
}, {
  path: '/video/game',
  text: '游戏'
}]

export default {
  recentData,
  videoData
}

export const RecentData = () => recentData
export const VideoData = () => videoData
