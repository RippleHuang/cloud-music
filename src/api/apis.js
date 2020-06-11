import { get, post } from './fetch'

// ======登陆======
export const phoneLogin = (phone, password) => post('/login/cellphone', { phone, password }) // 手机号登陆 参数 手机号 密码
export const phoneRegistered = (phone) => post('/cellphone/existence/check', { phone })// 手机号是否被注册 参数 手机号
export const sendVerify = (phone) => post('/captcha/sent', { phone }) // 发送验证码 参数 手机号
export const verify = (phone, captcha) => post('/captcha/verify', { phone, captcha }) // 验证验证码 参数 手机号 验证码
export const loginStatus = (params) => get('/login/status', params) // 登录状态
export const logout = (params) => get('/logout', params) // 退出登录
export const signIn = (type) => get('/daily_signin', { type }) // 签到 type 默认 0, 其中 0 为安卓端签到 ,1 为 web/PC 签到 安卓端签到可获得 3 点经验 , web/PC 端签到可获得 2 点经验
export const register = (phone, password, captcha, nickname) => post('/register/cellphone', { phone, password, captcha, nickname }) // 注册修改密码 参数 手机号 密码 验证码 昵称, 修改密码可以不需要昵称
// ======发现页面======
export const bannerSwiper = (params) => get('/banner?type=1', params) // 发现页面轮播图
export const recSongList = (params) => post('/top/playlist', params) // 推荐歌单，歌单广场
export const highquality = (params) => get('/top/playlist/highquality', params) // 精品歌单
export const catlist = (params) => get('/playlist/catlist', params) // 获取歌单分类
export const hot = (params) => get('/playlist/hot', params) // 获取热门歌单分类
export const topList = (params) => get('/toplist/detail', params) // 获取所有榜单内容摘要
export const idxList = (params) => get('/top/list', params) // 获取排行榜
export const albumDetail = (id, s = 5) => post('/playlist/detail', { id, s }) // 获取歌单详情 id-歌单 最近的 s 个收藏者,默认5个
export const recSongs = (params) => get('/recommend/songs', params) // 每日推荐歌曲
export const dateRecSongList = (params) => get('/recommend/resource', params) // 每日推荐歌单，发现页展示的那六个
export const newDish = (params) => post('/top/album', params) // 发现页新碟
export const getDishInfo = (params) => get('/album', params) // 获取专辑内容
export const newSongs = (params) => post('/top/song', params) // 发现页新歌
export const personalFm = (params) => get('/personal_fm', params) // 发现页私人FM
// ======我的页面======
export const userRecord = (params) => get('/user/record', params)// 用户播放记录
export const userInfo = (timestamp) => get('/user/subcount', { timestamp })// 用户信息
export const userDetail = (uid) => post('/user/detail', { uid })// 用户详情
export const userEvent = (params) => get('/user/event', params)// 用户动态
export const playlist = (uid, timestamp) => post('/user/playlist', { uid, timestamp })// 用户歌单 用户id-uid 时间戳-timestamp
export const userDj = (params) => get('/user/dj', params)// 用户电台 申请做主播那一行
export const favoriteAlbums = (params) => get('/album/sublist', params)// 获取收藏的专辑
export const favoriteArtists = (params) => get('/artist/sublist', params)// 获取收藏的歌手
export const favoriteVideos = (params) => get('/mv/sublist', params)// 获取收藏的视频
export const djSublist = (params) => get('/dj/sublist', params)// 获取订阅的电台
// ======视频页面======
export const getVideoTag = (params) => get('/video/group/list', params) // 获取视频标签导航
export const getVideoGroup = (params) => get('/video/group', params) // 获取对应标签的视频详情
export const getVideoUrl = (params) => get('/video/url', params) // 获取视频播放地址
export const getVideoDetail = (params) => get('/video/detail', params) // 获取视频详情
export const getVideoRelated = (params) => get('/related/allvideo', params) // 获取相关视频
export const getVideoComments = (params) => get('/comment/video', params) // 获取视频评论
