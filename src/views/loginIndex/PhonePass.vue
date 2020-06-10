<template>
  <div class="phone-login">
    <div class="phone-con">
      <input
      class="phone-num"
      type="password"
      placeholder="请输入密码"
      v-model="phonePass"
      >
      <router-link class="forget-link" tag="a" :to="{ name: 'forgetpass', params: { phone }}">忘记密码?</router-link>
    </div>
    <van-button class="next" round @click="nextLogin">{{text}}</van-button>
  </div>
</template>
<script>
import { phoneLogin, loginStatus, userDetail } from 'api/apis'
export default {
  name: 'PhonePass',
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      phonePass: '',
      text: '登录',
      phone: ''
    }
  },
  created () {
    // 得到标题名
    this.$emit('viewData', this.name)
    // 得到phone
    this.phone = localStorage.getItem('phoneNumber')
  },
  methods: {
    // 登录
    async nextLogin () {
      const toast = this.$toast({
        position: 'bottom',
        className: 'phone-toast'
      })
      if (this.phonePass === '') {
        toast.message = '请输入密码'
      } else {
        // 修改按钮text
        this.text = '登录中...'
        // 加载动画
        await this.$toast.loading({
          duration: 500
        })
        this.passVerity(this.phone, this.phonePass)
      }
    },
    // 密码验证
    passVerity (phone, pass) {
      phoneLogin(phone, pass)
        .then(data => {
          this.$toast('登录成功')
          // code 200密码正确,502密码错误
          if (data.code === 200) {
            // 得到用户数据
            this.getUserinfo()
          } else {
            // 修改按钮text
            this.text = '登录'
            this.$toast({
              position: 'bottom',
              className: 'phone-toast',
              message: '密码错误'
            })
          }
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    // 用户信息,状态码
    getUserinfo () {
      loginStatus()
        .then(data => {
          // 修改按钮text
          this.text = '登录'
          // 存取用户信息
          const accountInfo = data.profile
          // 修改状态为 true
          this.$store.dispatch('loginState', true)
          // 存入头像昵称
          localStorage.setItem('avatarUrl', accountInfo.avatarUrl)
          localStorage.setItem('nickname', accountInfo.nickname)
          // 存入uid信息
          this.$store.dispatch('accountUid', accountInfo.userId)
          this.skipFind(accountInfo.userId)
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    // 跳转find页面
    skipFind (id) {
      userDetail(id)
        .then(data => {
          // 存储lv信息
          this.$store.dispatch('setLevel', data.level)
          // 跳转到主页
          this.$router.push('/find')
        })
    }
  }
}
</script>
<style lang='scss' scoped>
.forget-link {
  position: absolute;
  right: 0;
  bottom: .22rem;
}
</style>
