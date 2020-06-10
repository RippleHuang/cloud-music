<template>
  <div class="phone-verify">
    <span>验证码已发送至</span>
    <div class="info">
      <span class="phone">+86&nbsp;&nbsp;{{first}}****{{after}}</span>
      <a @click="sendPhoneVerify" class="get-verify">{{title}}</a>
    </div>
    <div class="vcode" id='vertifycode'>
      <input type="tel" maxlength='4' class='code'
        v-model="code"
        @input="inputCode"
      >
      <div class="labels">
        <label class="label" for="code"
          v-for="(item, index) in 4"
          :key="index"
        >
        {{arrCode[index]}}
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { sendVerify, verify, register } from 'api/apis'
import CryptoJS from 'crypto-js'
export default {
  name: 'PhoneVerify',
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      code: '',
      first: '',
      after: '',
      title: '',
      timer: '',
      // 锁
      lock: false,
      path: '',
      phone: localStorage.getItem('phoneNumber')
    }
  },
  // 进入前判定从哪里进入
  beforeRouteEnter (to, from, next) {
    console.log(to.path)
    const exp = /forgetpass/g
    const exp1 = /phone/g
    if (exp.test(from.path)) {
      next(vm => {
        vm.$data.path = 'forgetpass'
      })
    } else if (exp1.test(from.path)) {
      next(vm => {
        vm.$data.path = 'phone'
      })
    } else if (from.path === '/') { // 页面刷新 path 为 /
      next(vm => {
        vm.$data.path = localStorage.getItem('path1')
      })
    } else {
      // 其他方式进来的跳转到登录页
      next('/login')
    }
  },
  created () {
    // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
    clearInterval(this.timer)
    this.timer = null
    // 跳转这个页面默认已经发送了验证码
    this.sendButton()
    this.$nextTick(() => {
      // 在页面刷新时将path保存到localStorage里
      window.addEventListener('beforeunload', () => {
        localStorage.setItem('path1', this.path)
      })
    })
  },
  mounted () {
    this.$emit('viewData', this.name)
    this.first = this.phone.slice(0, 3)
    this.after = this.phone.slice(7, 12)
  },
  computed: {
    arrCode: function () {
      return this.code.split('')
    }
  },
  methods: {
    // 发送验证码
    sendPhoneVerify () {
      const toast = this.$toast({
        position: 'bottom',
        className: 'phone-toast'
      })
      if (this.lock) {
        sendVerify(this.phone)
          .then(data => {
            toast.message = '已发送验证码'
          })
          .catch(err => {
            if (err.response.status === 400) {
              toast.message = '每个手机号一天只能发5条验证码'
            } else {
              this.$toast('发送失败,请稍后尝试')
            }
          })
        this.lock = false
        this.sendButton()
      } else {
        toast.message = '已发送验证码,10分钟内有效'
      }
    },
    // 输入
    inputCode () {
      this.code = this.code.replace(/[^\d]/g, '') // 限制非数字
      if (this.code.length >= 4) {
        if (this.path === 'forgetpass') {
          // 得到加密密码
          const cipherText = sessionStorage.getItem('cipherText')
          // Decrypt 解密
          const bytes = CryptoJS.AES.decrypt(cipherText, 'PhonePassword')
          const pass = bytes.toString(CryptoJS.enc.Utf8)
          // 修改密码
          this.changePass(this.phone, pass, this.code)
        } else if (this.path === 'phone') {
          // 新用户跳转到忘记密码页
          this.codeVerity()
        }
      }
    },
    // 修改密码
    changePass (phone, password, captcha, nickname) {
      register(phone, password, captcha, nickname)
        .then(data => {
          this.$toast('修改成功')
          // 跳转到登录页
          this.$router.push('/login')
        })
        .catch(err => {
          if (err.response.status === 503) {
            this.$toast('验证码错误')
          } else {
            this.$toast('注册失败,请稍后尝试')
          }
        })
    },
    codeVerity () {
      // 验证验证码
      verify(this.phone, this.code)
        .then(data => {
          if (data.code === 200) {
            this.$toast('验证码正确')
            // 保存code
            // 跳转到忘记密码页
            localStorage.setItem('code', this.code)
            this.$router.push('forgetpass')
          } else {
            this.$toast('验证码错误')
            this.code = ''
          }
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    // 右边按钮
    sendButton () {
      if (!this.lock) {
        let second = 60
        this.timer = setInterval(() => {
          second--
          if (second >= 0) {
            this.title = `${second}s`
            document.querySelector('.get-verify').classList.add('color')
          } else {
            clearInterval(this.timer)
            this.title = '重新获取'
            document.querySelector('.get-verify').classList.remove('color')
            this.lock = true
          }
        }, 1000)
      }
    }
  },
  // 导航离开前关闭定时器
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer)
    this.timer = null
    next()
  },
  destroyed () {
    // 每次离开当前界面时，清除定时器
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
<style lang='scss' scoped>
.phone-verify {
  padding: .6rem .5rem 0;
  box-sizing: border-box;
  span {
    color: black;
    font-size: .36rem;
  }
  .info {
    display: flex;
    justify-content: space-between;
    padding: .5rem 0 0;
    span {
      color: rgb(167, 163, 163);
      font-size: .32rem;
    }
    .get-verify {
      font-size: .28rem;
    }
  }
  // 验证码
  .vcode {
    position: relative;
    width: 80%;
    margin: 1rem auto 0;
    padding: 0 .4rem;
    overflow: hidden;
    // 隐藏input
    .code {
      width: 100%;
      padding: 0;
      height: 40px;
      font-size: 35px;
      overflow: hidden;
      border: none;
      outline: none;
      opacity: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .labels {
      display: flex;
      height: 40px;
      justify-content: space-between;
      margin-top: -40px;
      -webkit-tap-highlight-color: transparent;// 解决ios点击灰色阴影的问题
      .label {
        height: 34px;
        width: 18%;
        color: #313131;
        font-size: 30px;
        text-align: center;
        padding-bottom: 4px;
        border-bottom: solid 2px #313131;
      }
    }
  }
  // 字体灰色
  .color {
    color: rgb(184, 180, 180);
  }
}
</style>
