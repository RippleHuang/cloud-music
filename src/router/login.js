/* 登录页面 */
const Login = () => import(/* webpackChunkName: "login-index" */ 'views/loginIndex/Login')
const LoginPage = () => import(/* webpackChunkName: "login-loginPage" */ 'views/loginIndex/LoginPage')
const LoginPhone = () => import(/* webpackChunkName: "login-loginPhone" */ 'views/loginIndex/LoginPhone')
const PhonePass = () => import(/* webpackChunkName: "login-phonepass" */ 'views/loginIndex/PhonePass')
const ForgetPass = () => import(/* webpackChunkName: "login-forgetpass" */ 'views/loginIndex/ForgetPass')
const PhoneVerify = () => import(/* webpackChunkName: "login-phoneverify" */ 'views/loginIndex/PhoneVerify')
export default [
  // 登录相关路由
  {
    path: '/login',
    component: Login
  },
  {
    path: '/loginpage',
    component: LoginPage,
    redirect: '/loginpage/phone',
    children: [{
      path: 'phone',
      component: LoginPhone,
      props: { name: '手机号登录' }
    }, {
      path: 'phonepass',
      component: PhonePass,
      props: { name: '手机号登录' }
    }, {
      path: 'forgetpass',
      component: ForgetPass,
      props: { name: '忘记密码' }
    }, {
      path: 'phoneverify',
      component: PhoneVerify,
      props: { name: '手机号验证' }
    }]
  }
]
