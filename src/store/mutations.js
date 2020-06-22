// 包含多个由actions触发直接去更新状态的方法对象
import {
  LOGIN_STATE,
  SET_LEVEL,
  ACCOUNT_UID,
  LOGIN_OUT,
  NICK_NAME,
  AVATAR_URL,
  SET_PLAY_SATE,
  SET_AUDIO_LIST,
  SET_AUDIO_INDEX,
  SET_AUDIO_MODE,
  SET_PLAY_LIST,
  SET_FULL_SCREEN
} from './mutations-types'
export default {
  // 用户状态
  [LOGIN_STATE] (state, boole) {
    state.loginState = boole
    localStorage.setItem('loginState', boole)
  },
  // 用户等级
  [SET_LEVEL] (state, lv) {
    state.level = lv
    localStorage.setItem('level', lv)
  },
  // 用户uid
  [ACCOUNT_UID] (state, uid) {
    state.accountUid = uid
    localStorage.setItem('accountUid', uid)
  },
  // 用户昵称
  [NICK_NAME] (state, nickname) {
    state.nickName = nickname
    localStorage.setItem('nickname', nickname)
  },
  // 用户头像
  [AVATAR_URL] (state, avatarUrl) {
    state.avatarUrl = avatarUrl
    localStorage.setItem('avatarUrl', avatarUrl)
  },
  // 退出
  [LOGIN_OUT] (state) {
    localStorage.clear()
    state.level = 0
    state.accountUid = 0
    state.nickName = ''
    state.avatarUrl = ''
    state.loginState = false
  },
  // 播放状态
  [SET_PLAY_SATE] (state, boole) {
    state.playState = boole
  },
  // 播放列表信息
  [SET_AUDIO_LIST] (state, list) {
    state.audioList = list
  },
  // 索引
  [SET_AUDIO_INDEX] (state, index) {
    state.audioIngIndex = index
  },
  // 播放列表
  [SET_PLAY_LIST] (state, list) {
    state.playList = list
  },
  // 播放模式
  [SET_AUDIO_MODE] (state, mode) {
    state.mode = mode
  },
  // 全屏播放器或迷你播放器
  [SET_FULL_SCREEN] (state, boole) {
    state.fullScreen = boole
  }
}
