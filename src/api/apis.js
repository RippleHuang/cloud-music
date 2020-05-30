import { get } from './fetch'

// ======发现页面======
export const bannerSwiper = (params) => get('/banner?type=1', params) // 发现页面轮播图
export const recSongList = (params) => get('/top/playlist', params) // 推荐歌单，歌单广场
export const highquality = (params) => get('/top/playlist/highquality', params) // 精品歌单
export const catlist = (params) => get('/playlist/catlist', params) // 获取歌单分类
export const hot = (params) => get('/playlist/hot', params) // 获取热门歌单分类
export const topList = (params) => get('/toplist/detail', params) // 获取所有榜单内容摘要
export const idxList = (params) => get('/top/list', params) // 获取排行榜
export const albumDetail = (id, s = 5) => get('/playlist/detail', { id, s }) // 获取歌单详情 id-歌单 最近的 s 个收藏者,默认5个
export const recSongs = (params) => get('/recommend/songs', params) // 每日推荐歌曲
export const dateRecSongList = (params) => get('/recommend/resource', params) // 每日推荐歌单，发现页展示的那六个
export const newDish = (params) => get('/top/album', params) // 发现页新碟
export const getDishInfo = (params) => get('/album', params) // 获取专辑内容
export const newSongs = (params) => get('/top/song', params) // 发现页新歌
export const personalFm = (params) => get('/personal_fm', params) // 发现页私人FM
// ======我的页面======
export const userRecord = (params) => get('/user/record', params)// 用户播放记录
export const userInfo = (params) => get('/user/subcount', params)// 用户信息
export const userDetail = (params) => get('/user/detail', params)// 用户详情
export const userEvent = (params) => get('/user/event', params)// 用户动态
export const playlist = (uid, timestamp) => get('/user/playlist', { uid, timestamp })// 用户歌单 用户id-uid 时间戳-timestamp
export const userDj = (params) => get('/user/dj', params)// 用户电台 申请做主播那一行
export const favoriteAlbums = (params) => get('/album/sublist', params)// 获取收藏的专辑
export const favoriteArtists = (params) => get('/artist/sublist', params)// 获取收藏的歌手
export const favoriteVideos = (params) => get('/mv/sublist', params)// 获取收藏的视频
export const djSublist = (params) => get('/dj/sublist', params)// 获取订阅的电台
