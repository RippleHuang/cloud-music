<template>
  <div class="phone-login">
    <span class="info">未注册手机号登录后将自动创建账号</span>
    <div class="phone-con">
      <span class="phone-left">+86</span>
      <input
      class="phone-num"
      type="text"
      placeholder="请输入手机号"
      maxlength="11"
      required="required"
      v-model="phoneNumber"
      @input="inputNumber"
      >
      <i @click="clear" class="iconfont icon-chahao"></i>
    </div>
    <van-button class="next" round @click="nextPass">下一步</van-button>
  </div>
</template>
<script>
import { phoneRegistered, sendVerify } from 'api/apis'
export default {
  name: 'LoginPhone',
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      phoneNumber: ''
    }
  },
  mounted () {
    this.$emit('viewData', this.name)
    this.getLocalStorage()
  },
  methods: {
    clear () {
      this.phoneNumber = ''
      // 并不在input事件中,清除时需要把左侧字体颜色改变
      document.querySelector('.phone-left').style.color = 'rgb(158, 151, 152)'
    },
    inputNumber () {
      // 只允许输入数字
      this.phoneNumber = this.phoneNumber.replace(/[^\d]/g, '')
      /* 左侧字体颜色改变 */
      const colorChange = document.querySelector('.phone-left')
      if (this.phoneNumber === '') {
        colorChange.style.color = 'rgb(158, 151, 152)'
      } else {
        colorChange.style.color = 'black'
      }
    },
    // 验证账号是否存在并跳转相应页面
    verification (phone) {
      phoneRegistered(phone)
        .then(data => {
          // localStorage 存储
          localStorage.setItem('phoneNumber', phone)
          // exist为1则有账号,-1为无账号
          if (data.exist === 1) {
            this.$router.push('phonepass')
          } else if (data.exist === -1) {
            this.sendVerifyNum(phone)
            this.$router.push('phoneverify')
          }
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    nextPass () {
      /* toast */
      const toast = this.$toast({
        position: 'bottom',
        className: 'phone-toast'
      })
      /* 手机号验证 */
      const exp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (this.phoneNumber === '') {
        toast.message = '请输入手机号'
      } else if (exp.test(this.phoneNumber)) {
        // 加载动画
        this.$toast.loading({
          duration: 500
        })
        this.verification(this.phoneNumber)
      } else {
        toast.message = '请输入正确的手机号'
      }
    },
    // 发送验证码
    sendVerifyNum (phone) {
      sendVerify(phone)
        .then(data => {
          if (data.code === 200) {
            this.$toast('发送成功')
          } else if (data.code === 400) {
            this.$toast('每个手机号一天只能发5条验证码')
          }
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    // 获取localStorage 中存储的手机号
    getLocalStorage () {
      const phone = localStorage.getItem('phoneNumber')
      if (phone) {
        this.phoneNumber = phone
        document.querySelector('.phone-left').style.color = 'black'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.phone-login {
  .info {
    color: rgb(158, 151, 152);
    font-size: .28rem;
  }
  .phone-left {
    margin-top: .35rem;
    font-size: .36rem;
    color: rgb(158, 151, 152);
  }
}
</style>
