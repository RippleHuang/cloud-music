// 接收组件通知触发mutations调用间接改变状态方法的对象
import {
  LOGIN_STATE,
  SET_LEVEL,
  ACCOUNT_UID,
  LOGIN_OUT,
  NICK_NAME,
  AVATAR_URL
} from './mutations-types'
export default {
  loginState ({ commit }, loginState) {
    commit(LOGIN_STATE, loginState)
  },
  loginOut ({ commit }) {
    commit(LOGIN_OUT)
  },
  setLevel ({ commit }, lv) {
    commit(SET_LEVEL, lv)
  },
  accountUid ({ commit }, uid) {
    commit(ACCOUNT_UID, uid)
  },
  nickName ({ commit }, nickname) {
    commit(NICK_NAME, nickname)
  },
  avatarUrl ({ commit }, avatarUrl) {
    commit(AVATAR_URL, avatarUrl)
  }
}
