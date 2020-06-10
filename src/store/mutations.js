// 包含多个由actions触发直接去更新状态的方法对象
import {
  LOGIN_STATE,
  SET_LEVEL,
  ACCOUNT_UID,
  LOGIN_OUT
} from './mutations-types'
export default {
  // 用户状态
  [LOGIN_STATE] (state, loginState) {
    state.loginState = loginState
    localStorage.setItem('loginState', loginState)
  },
  // 退出
  [LOGIN_OUT] (state) {
    localStorage.clear()
    state.level = 0
    state.accountUid = 0
    state.loginState = false
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
  }
}
