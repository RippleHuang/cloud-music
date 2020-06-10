export default {
  loginState: JSON.parse(localStorage.getItem('loginState')) || false, // 登陆状态，初始值为 false 未登录，登陆成功设置为 true
  accountUid: JSON.parse(localStorage.getItem('accountUid')) || 0, // 存取用户 uid
  level: JSON.parse(localStorage.getItem('level')) || 0 // 用户等级
}
