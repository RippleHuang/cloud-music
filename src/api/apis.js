import { get } from './fetch'

// ======发现页面======
export const bannerSwiper = (params) => get('/banner?type=1', params) // 发现页面轮播图
export const recSongList = (params) => get('/top/playlist', params) // 推荐歌单，歌单广场
export const highquality = (params) => get('/top/playlist/highquality', params) // 精品歌单
export const catlist = (params) => get('/playlist/catlist', params) // 获取歌单分类
export const hot = (params) => get('/playlist/hot', params) // 获取热门歌单分类
export const topList = (params) => get('/toplist/detail', params) // 获取所有榜单内容摘要
export const idxList = (params) => get('/top/list', params) // 获取排行榜
export const albumDetail = (params) => get('/playlist/detail', params) // 获取歌单详情
export const recSongs = (params) => get('/recommend/songs', params) // 每日推荐歌曲
export const dateRecSongList = (params) => get('/recommend/resource', params) // 每日推荐歌单，发现页展示的那六个
export const newDish = (params) => get('/top/album', params) // 发现页新碟
export const getDishInfo = (params) => get('/album', params) // 获取专辑内容
export const newSongs = (params) => get('/top/song', params) // 发现页新歌
export const personalFm = (params) => get('/personal_fm', params) // 发现页私人FM
