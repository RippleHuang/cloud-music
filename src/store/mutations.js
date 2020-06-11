// 包含多个由actions触发直接去更新状态的方法对象
import {
  LOGIN_STATE,
  SET_LEVEL,
  ACCOUNT_UID,
  LOGIN_OUT,
  NICK_NAME,
  AVATAR_URL
} from './mutations-types'
export default {
  // 用户状态
  [LOGIN_STATE] (state, loginState) {
    state.loginState = loginState
    localStorage.setItem('loginState', loginState)
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
  }
}
