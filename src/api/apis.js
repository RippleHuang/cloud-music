import { get, post } from './fetch'
// ======登陆======
export const phoneLogin = (phone, password) => post(`/login/cellphone?timestamp=${+new Date()}`, { phone, password }) // 手机号登陆 参数 手机号 密码
export const phoneRegistered = phone => post(`/cellphone/existence/check?timestamp=${+new Date()}`, { phone })// 手机号是否被注册 参数 手机号
export const sendVerify = phone => post(`/captcha/sent?timestamp=${+new Date()}`, { phone }) // 发送验证码 参数 手机号
export const verify = (phone, captcha) => post(`/captcha/verify?timestamp=${+new Date()}`, { phone, captcha }) // 验证验证码 参数 手机号 验证码
export const loginStatus = () => get(`/login/status?timestamp=${+new Date()}`) // 获得登录状态
export const logout = () => get(`/logout?timestamp=${+new Date()}`) // 退出登录
export const signIn = type => post(`/daily_signin?timestamp=${+new Date()}`, { type }) // 签到 type 默认 0, 其中 0 为安卓端签到 ,1 为 web/PC 签到
export const register = (phone, password, captcha, nickname) => post(`/register/cellphone?timestamp=${+new Date()}`, { phone, password, captcha, nickname }) // 注册修改密码 参数 手机号 密码 验证码 昵称, 修改密码可以不需要昵称
// ======发现页面======
export const bannerSwiper = (type = 1) => get('/banner', { type }) // 发现页面轮播图
export const recSongList = (limit, cat, offset, order) => post(`/top/playlist?timestamp=${+new Date()}`, { limit, cat, offset, order }) // 推荐歌单 参数 取出数量 tag 偏移量 最新或最热
export const highQuality = (limit, before, cat) => post(`/top/playlist/highquality?timestamp=${+new Date()}`, { limit, before, cat }) // 精品歌单 参数 取出数量 页数 tag
export const topList = () => get('/toplist/detail') // 获取所有榜单内容
export const playlistDetail = (id, s) => post(`/playlist/detail?timestamp=${+new Date()}`, { id, s }) // 获取歌单详情 id-歌单 最近的 s 个收藏者
export const songInfo = ids => post(`/song/detail?timestamp=${+new Date()}`, { ids }) // 歌曲详情 参数 歌曲id, 可多个,逗号分开
export const recSongs = () => get('/recommend/songs') // 每日推荐歌曲
export const loginRecSongList = () => get(`/recommend/resource?timestamp=${+new Date()}`) // 每日推荐歌单，登录后
export const newDish = (limit, offset) => post(`/top/album?timestamp=${+new Date()}`, { limit, offset }) // 发现页新碟, 参数 个数 默认50 页数
export const albumDetail = id => post(`/album?timestamp=${+new Date()}`, { id }) // 获取专辑内容 参数 专辑id
export const albumDetailDynamic = id => post(`/album/detail/dynamic?timestamp=${+new Date()}`, { id }) // 获取专辑动态内容 参数 专辑id
export const findNewSong = () => get('/personalized/newsong') // 发现页新歌
export const newSongs = type => post(`/top/song?timestamp=${+new Date()}`, { type }) // 最新音乐 参数 类型
export const personalFm = () => get('/personal_fm') // 发现页私人FM
// ======我的或用户页面======
export const userRecord = (uid, type) => post(`/user/record?timestamp=${+new Date()}`, { uid, type }) // 用户播放记录 参数 用户id, 类型, type为1返回weekData,0返回allData
export const userInfo = uid => post(`/user/subcount?timestamp=${+new Date()}`, { uid }) // 用户信息
export const userDetail = uid => post(`/user/detail?timestamp=${+new Date()}`, { uid }) // 用户详情 参数 用户id
export const userEvent = (uid, limit, lasttime) => post(`/user/event?timestamp=${+new Date()}`, { uid, limit, lasttime }) // 用户动态 参数 用户id 返回数量,默认30 返回数据的lasttime,默认-1
export const playlist = uid => post(`/user/playlist?timestamp=${+new Date()}`, { uid }) // 用户歌单 参数 用户id
export const favoriteAlbums = (limit, offset) => post(`/album/sublist?timestamp=${+new Date()}`, { limit, offset }) // 获取收藏的专辑 参数 取出数量 默认为 25 页数, 默认0
export const favoriteArtists = () => get(`/artist/sublist?timestamp=${+new Date()}`) // 获取收藏的歌手
export const favoriteVideos = () => get(`/mv/sublist?timestamp=${+new Date()}`) // 获取收藏的视频
export const djSublist = () => get(`/dj/sublist?timestamp=${+new Date()}`) // 获取订阅的电台
// ======云村页面======
export const hotwallVillage = () => get('/comment/hotwall/list') // 获取云村热评
export const eventVillage = (pagesize, lasttime) => post(`/event?timestamp=${+new Date()}`, { pagesize, lasttime }) // 获取动态消息 参数 每页个数 页数
// ======视频页面======
export const videoTag = () => get('/video/group/list') // 获取视频标签导航
export const videoGroup = (id, offset) => post(`/video/group?timestamp=${+new Date()}`, { id, offset }) // 获取对应标签的视频详情 参数 标签id 页数
export const videoUrl = id => post(`/video/url?timestamp=${+new Date()}`, { id }) // 获取视频播放地址 参数 视频id
export const mvUrl = id => post(`/mv/url?timestamp=${+new Date()}`, { id }) // 获取mv播放地址 参数 mv id
export const videoDetail = id => post(`/video/detail?timestamp=${+new Date()}`, { id }) // 获取视频详情 参数 视频id
export const mvDetail = mvid => post(`/mv/detail?timestamp=${+new Date()}`, { mvid }) // 获取mv详情 参数 mv的id
// ======搜索页面======
export const search = (keywords, limit, offset, type) => post(`/search?timestamp=${+new Date()}`, { keywords, limit, offset, type }) // 搜索关键词 参数 关键字 返回数量,默认30  页数 类型
export const defaultSearch = () => get(`/search/default?timestamp=${+new Date()}`)// 默认搜索关键词
export const hotSearchList = () => get('/search/hot/detail')// 热搜列表
export const suggestSearch = (keywords, type = 'mobile') => post(`/search/suggest?timestamp=${+new Date()}`, { keywords, type }) // 搜索建议 参数 关键字 类型
export const singerClass = () => post('/artist/list')// 歌手分类
// ======播放歌曲======
export const songUrl = (id, br) => post(`/song/url?timestamp=${+new Date()}`, { id, br })// 获取歌曲url 参数 音乐id 码率,默认最大码率
export const checkSong = (id, br) => post(`/check/music?timestamp=${+new Date()}`, { id, br })// 查看歌曲是否可用 参数 音乐id 码率,默认最大码率
export const songLyric = id => post(`/lyric?timestamp=${+new Date()}`, { id })// 获取歌词 参数 音乐id
export const heartMode = (id, pid, sid) => post('/playmode/intelligence/list', { id, pid, sid })// 心动模式播放 参数 歌曲id 歌单id 要开始播放的歌曲id
export const likeMusicList = uid => post(`/likelist?timestamp=${+new Date()}`, { uid })// 喜欢歌曲列表 参数 用户uid
export const likeMusic = (id, like) => post(`/like?timestamp=${+new Date()}`, { id, like })// 喜欢歌曲 参数 音乐id 布尔值like
// 歌曲或歌单操作
export const editFavoritePlayList = (t, id) => post(`/playlist/subscribe?timestamp=${+new Date()}`, { t, id }) // 收藏/取消收藏歌单 参数 t 1收藏 2取消收藏 歌单id
export const editFavoriteAlbum = (t, id) => post(`/album/sub?timestamp=${+new Date()}`, { t, id }) // 收藏/取消收藏专辑 参数 t 1收藏 2取消收藏 歌单id
export const editSong = (op, pid, tracks) => post(`/playlist/tracks?timestamp=${+new Date()}`, { op, pid, tracks }) // 对歌单添加或删除歌曲 参数op add添加，del删除 歌单id 歌曲id
export const playlistAdd = (name, privacy) => post(`/playlist/create?timestamp=${+new Date()}`, { name, privacy }) // 添加歌单 参数 歌单名 是否隐私歌单,默认否,10为隐私
export const playlistUpdata = (id, name, desc, tags) => post(`/playlist/update?timestamp=${+new Date()}`, { id, name, desc, tags }) // 歌单信息更新 参数 歌单id 歌单名 描述 标签
export const playlistDelete = id => post(`/playlist/delete?timestamp=${+new Date()}`, { id }) // 删除歌单 参数 歌单id
