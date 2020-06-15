<template>
  <div class="phone-login">
    <div class="phone-con">
      <input
      class="phone-num"
      type="password"
      placeholder="请输入密码"
      v-model="phonePass"
      >
      <router-link class="forget-link" tag="a" :to="{ name: 'forgetpass' }">忘记密码?</router-link>
    </div>
    <van-button class="next" round @click="nextLogin">{{text}}</van-button>
  </div>
</template>
<script>
import { phoneLogin, loginStatus, userDetail } from 'api/apis'
import { mapMutations } from 'vuex'
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
      phone: localStorage.getItem('phoneNumber')
    }
  },
  created () {
    // 得到标题名
    this.$emit('viewData', this.name)
  },
  methods: {
    // 登录
    nextLogin () {
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
        this.$toast.loading({
          duration: 500
        })
        this.passVerity(this.phone, this.phonePass)
      }
    },
    ...mapMutations([
      'LOGIN_STATE',
      'SET_LEVEL',
      'ACCOUNT_UID',
      'NICK_NAME',
      'AVATAR_URL'
    ]),
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
          this.LOGIN_STATE(true)
          this.AVATAR_URL(accountInfo.avatarUrl)
          this.NICK_NAME(accountInfo.nickname)
          this.ACCOUNT_UID(accountInfo.userId)
          // 用户标识
          if (localStorage.getItem('tag')) {
            // 上次登录uid
            const tag = JSON.parse(localStorage.getItem('tag'))
            // 保存这次登录的uid
            localStorage.setItem('tag', JSON.stringify([tag[1], accountInfo.userId]))
          } else {
            // 保持长度
            localStorage.setItem('tag', JSON.stringify([accountInfo.userId, accountInfo.userId]))
          }
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
          this.SET_LEVEL(data.level)
          // // 清除加密密码
          // sessionStorage.clear()
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
