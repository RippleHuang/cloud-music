/* 登录页面 */
const Login = () => import(/* webpackChunkName: "login-index" */ 'views/loginIndex/Login')
export default [
  // 登录相关路由
  {
    path: '/login',
    component: Login
  }
]
