<template>
  <div class="phone-login">
    <div class="phone-con">
      <input
      class="phone-num"
      type="password"
      placeholder="设置登录密码,不少于6位"
      v-model="forgetPhonePass"
      required="required"
      >
      <i @click="clear" class="iconfont icon-chahao"></i>
    </div>
    <van-button class="next" round @click="forgetNext">下一步</van-button>
  </div>
</template>
<script>
import { sendVerify } from 'api/apis'
import CryptoJS from 'crypto-js'
export default {
  name: 'ForgetPass',
  props: {
    name: {
      type: String
    },
    name1: {
      type: String
    }
  },
  data () {
    return {
      forgetPhonePass: '',
      path: '',
      phone: localStorage.getItem('phoneNumber')
    }
  },
  // 进入前判定从哪里进入
  beforeRouteEnter (to, from, next) {
    const exp = /phoneverify/g
    const exp1 = /phonepass/g
    if (exp.test(from.path)) {
      next(vm => {
        vm.$data.path = 'phoneverify'
      })
    } else if (from.path === '/') {
      next(vm => {
        vm.$data.path = localStorage.getItem('path')
      })
    } else if (exp1.test(from.path)) {
      next(vm => {
        vm.$data.path = 'phonepass'
      })
    } else {
      // 允许注册时后退修改密码
      next(vm => {
        vm.$data.path = localStorage.getItem('path')
      })
    }
  },
  created () {
    this.$nextTick(() => {
      if (this.path === 'phonepass') {
        this.$emit('viewData', this.name)
      } else {
        this.$emit('viewData', this.name1)
      }
      // 在页面刷新时将path保存到localStorage里
      window.addEventListener('beforeunload', () => {
        localStorage.setItem('path', this.path)
      })
    })
  },
  methods: {
    clear () {
      this.forgetPhonePass = ''
    },
    async forgetNext () {
      const toast = this.$toast({
        position: 'bottom',
        className: 'phone-toast'
      })
      /* 不少于6位除了回车和换行的字符 */
      const exp = /[^.]{6,}$/
      if (this.forgetPhonePass === '') {
        toast.message = '请输入密码'
      } else if (exp.test(this.forgetPhonePass)) {
        // 加载动画
        await this.$toast.loading({
          duration: 500
        })
        this.pushPage()
      } else {
        toast.message = '请输入不少于6位的密码'
      }
    },
    // 跳转到相应页面
    pushPage () {
      // 加密密码保存到 sessionStorage
      const cipherText = CryptoJS.AES.encrypt(
        this.forgetPhonePass,
        'PhonePassword'
      ).toString()
      sessionStorage.setItem('cipherText', cipherText)
      if (this.path === 'phonepass') {
        this.sendVerifyNum(this.phone)
      } else if (this.path === 'phoneverify') {
        // 跳转到昵称页面
        this.$router.push('nickname')
      }
    },
    // 发送验证码
    sendVerifyNum (phone) {
      sendVerify(phone)
        .then(data => {
          if (data.code === 200) {
            this.$toast('发送成功')
            // 跳转到验证码页面
            this.$router.push('phoneverify')
          } else if (data.code === 400) {
            this.$toast('每个手机号一天只能发5条验证码')
          }
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
