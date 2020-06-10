<template>
  <div class="phone-login">
    <div class="logo">
      <img src="../../assets/img/hi.jpg" alt>
      <p>希望大家怎么称呼您呢？</p>
    </div>
    <div class="phone-con">
      <input
      class="phone-num"
      type="text"
      placeholder="请输入昵称"
      v-model="nickName"
      required="required"
      >
      <i @click="clear" class="iconfont icon-chahao"></i>
    </div>
    <van-button class="next" round @click="register">开启云音乐</van-button>
  </div>
</template>
<script>
import { register } from 'api/apis'
import CryptoJS from 'crypto-js'
export default {
  name: 'NickName',
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      nickName: ''
    }
  },
  mounted () {
    this.$emit('viewData', this.name)
  },
  methods: {
    clear () {
      this.nickName = ''
    },
    register () {
      /* 不少于2个汉字或4个字符 */
      const exp = /([\u4e00-\u9fa5]{2,})|[A-Za-z0-9]{4,}/
      if (this.nickName === '') {
        this.$toast('请输入昵称')
      } else if (exp.test(this.nickName)) {
        // 加载动画
        this.$toast.loading({
          duration: 500
        })
        // 获取数据
        const phone = localStorage.getItem('phoneNumber')
        const code = localStorage.getItem('code')
        // 得到加密密码
        const cipherText = sessionStorage.getItem('cipherText')
        // Decrypt 解密
        const bytes = CryptoJS.AES.decrypt(cipherText, 'PhonePassword')
        const pass = bytes.toString(CryptoJS.enc.Utf8)
        this.registerPass(phone, pass, code, this.nickName)
      } else {
        this.$toast('请输入不少于2个汉字或4个字符的昵称')
      }
    },
    // 注册用户
    registerPass (phone, password, captcha, nickname) {
      register(phone, password, captcha, nickname)
        .then(data => {
          this.$toast('注册成功')
          // 跳转到登录页
          this.$router.push('/login')
        })
        .catch(err => {
          // 505 昵称已存在
          if (err.response.status === 505) {
            this.$toast('昵称已存在')
            this.nickName = ''
          } else if (err.response.status === 503) {
            this.$toast('验证码已过期')
          } else {
            this.$toast('注册失败,请稍后尝试')
          }
        })
    }
  }
}
</script>
<style lang='scss' scoped>
.logo {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  img {
    width: 3.4rem;
    height: 3.4rem;
  }
  p {
    padding: .3rem 0 0 .2rem;
    color: black;
    font-size: .32rem;
  }
}
</style>
