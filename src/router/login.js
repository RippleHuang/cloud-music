/* 登录页面 */
const Login = () => import(/* webpackChunkName: "login-index" */ 'views/loginIndex/Login')
const LoginPage = () => import(/* webpackChunkName: "login-loginPage" */ 'views/loginIndex/LoginPage')
const LoginPhone = () => import(/* webpackChunkName: "login-loginPhone" */ 'views/loginIndex/LoginPhone')
const PhonePass = () => import(/* webpackChunkName: "login-phonepass" */ 'views/loginIndex/PhonePass')
const ForgetPass = () => import(/* webpackChunkName: "login-forgetpass" */ 'views/loginIndex/ForgetPass')
const PhoneVerify = () => import(/* webpackChunkName: "login-phoneverify" */ 'views/loginIndex/PhoneVerify')
const NickName = () => import(/* webpackChunkName: "login-nickName" */ 'views/loginIndex/NickName')
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
      name: 'forgetpass',
      component: ForgetPass,
      props: { name: '忘记密码', name1: '手机号注册' }
    }, {
      path: 'phoneverify',
      component: PhoneVerify,
      props: { name: '手机号验证' }
    }, {
      path: 'nickname',
      component: NickName,
      props: { name: '给自己取一个昵称' }
    }]
  }
]
