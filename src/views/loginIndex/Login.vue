<template>
  <div class="login-mask">
    <div class="logo">
      <div class="circle"></div>
      <div class="circle"></div>
      <i class="iconfont icon-wangyiyunyinle1"></i>
    </div>
    <div class="login">
      <van-button class="login-btn" round @click="phoneLogin">手机号登录</van-button>
      <div class="login-icons">
        <span @click="unfinished"><i class="iconfont icon-weixin"></i></span>
        <span @click="unfinished"><i class="iconfont icon-qq"></i></span>
        <span @click="unfinished"><i class="iconfont icon-weibo"></i></span>
        <span><i class="iconfont icon-wangyi"></i></span>
      </div>
      <div class="text">
        <van-checkbox v-model="checked" icon-size=".31rem" shape="square" checked-color="rgba(255, 255, 255, .1)">同意</van-checkbox>
        <span>《用户协议》《隐私政策》《儿童隐私政策》</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  name: 'Login',
  data () {
    return {
      checked: false
    }
  },
  methods: {
    hint () {
      Toast('请先勾选同意《用户协议》《隐私政策》《儿童隐私政策》')
      // 抖动
      const text = document.querySelector('.text')
      text.classList.add('shake')
      setTimeout(() => { text.classList.remove('shake') }, 500)
    },
    phoneLogin () {
      if (!this.checked) {
        this.hint()
      } else {
        /* 跳转到手机登录界面,相当于 to="/loginpage" */
        this.$router.push('/loginpage')
      }
    },
    unfinished () {
      if (!this.checked) {
        this.hint()
      } else {
        Toast('只支持手机号登录和网易登录,其他尚未实装,敬请期待！')
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.login-mask {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to bottom, #dd001b, rgb(255, 44, 44));
  height: 100vh;
  padding: 2.5rem .3rem 0;
  box-sizing: border-box;
  .logo {
    position: relative;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    color: #fff;
    background-color: #fc0420;
    border-radius: 50%;
    /* 波纹效果 */
    .circle {
      position: absolute;
      width: 1.8rem;
      height: 1.8rem;
      border: .01rem solid rgb(243, 121, 121);
      border-radius: 50%;
      box-sizing: border-box;
      opacity: 0;
    }
    .circle:first-child {
      animation: circle 4s infinite;
    }
    .circle:nth-child(2) {
      animation: circle 4s 1.5s infinite;
    }
    i {
      font-size: 1.1rem;
    }
  }
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: .3rem;
    .login-btn {
      width: 72vw;
      height: 1rem;
      color: #e60721;
      font-size: .35rem;
      &:active {
        background-color: rgba(255, 255, 255, .8);
        border: none;
      }
    }
    .login-icons {
      display: flex;
      justify-content: space-between;
      width: 68vw;
      padding: .6rem .1rem;
      span {
        width: .8rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        color: #fff;
        background-color: transparent;
        border: .01rem solid rgba(255, 255, 255, .3);
        border-radius: 50%;
        box-sizing: border-box;
        &:active {
          background-color: rgba(255, 255, 255, .3);
          border: .01rem solid transparent;
        }
        i {
          font-size: .42rem;
        }
      }
    }
    .text {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: .2rem;
      span {
        color: #fff;
      }
    }
    // 抖动
    .shake {
      animation: shake .15s ease-in-out infinite;
    }
  }
}
@keyframes circle{
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(3.5);
  }
}
@keyframes shake{
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(.1rem);
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(-0.1rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
