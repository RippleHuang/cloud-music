const UserIndex = () => import(/* webpackChunkName: "userInfo" */ 'views/userInfo/UserIndex')
const ListAll = () => import(/* webpackChunkName: "user-listAll" */ 'views/userInfo/ListAll')
export default [
  // 用户信息
  {
    path: '/userinfo',
    component: UserIndex
  },
  {
    path: '/listall/',
    name: 'listAll',
    component: ListAll,
    props: true
  }
]
