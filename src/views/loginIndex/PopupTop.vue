<template>
  <div class="popup-top">
    <!-- 未登录 -->
    <div class="not-login" v-if="!loginState">
      <p>登录网易云音乐</p>
      <p>手机电脑多端同步，尽享海量高品质音乐</p>
      <van-button class="title-btn" round type="info" @click="toPass">立即登录</van-button>
    </div>
    <!-- 已登录 -->
    <div class="logining" v-if="loginState">
      <div class="left-con">
        <img class="account-bgi" :src="avatarUrl" alt />
        <div class="information">
          <span class="account-nickname">{{nickName}}</span>
          <span class="lv">Lv.{{level}}</span>
        </div>
      </div>
      <div class="right-btn">
        <!-- 防止冒泡 -->
        <van-button
          type="danger"
          size="small"
          round
          class="sign"
          @click.stop="signInClick"
          v-show="!signIn"
        >
          <i class="iconfont icon-tubiaozhizuo-"></i>签到
        </van-button>
        <van-button
          size="small"
          class="signed"
          round
          v-show="signIn"
          @click.stop="signInClick"
        >
          已签到
          <i class="iconfont icon-arrow-right"></i>
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { signIn } from 'api/apis'
import { format } from 'utils/date'
export default {
  name: 'PopupTop',
  data () {
    return {
      signIn: false
    }
  },
  mounted () {
    // 初始化签到样式
    this.signInInit()
  },
  computed: {
    ...mapGetters(['loginState', 'level', 'nickName', 'avatarUrl'])
  },
  methods: {
    toPass () {
      // 默认有体验按钮
      this.$router.push({ path: '/login', query: { login: localStorage.getItem('login') || 'login' } })
    },
    // 签到样式
    signInInit () {
      const date = new Date()
      const nowTime = format(date, '/').slice(0, 11) // 截取当前日期 yyyy/mm/dd
      // 把日期转化为数值
      const signInNum = nowTime.split('/').join('')
      // 当前时间,转化为数字
      const nowSign = JSON.parse(signInNum)
      // 本地记录
      if (localStorage.getItem('signInNum')) {
        // 最后签到时间,转化为数字
        const lastSign = JSON.parse(localStorage.getItem('signInNum'))
        if (nowSign > lastSign) {
          // 未签到
          this.signIn = false
        } else {
          // 已签到
          this.signIn = true
        }
      } else { // 默认未签到
        this.signIn = false
      }
    },
    // 保存最后签到时间
    setSignIn () {
      console.log(this.nickName, this.avatarUrl)
      const date = new Date()
      const nowTime = format(date, '/').slice(0, 11) // 截取当前日期
      // 把日期转化为数值并保存到localStorage
      const signInNum = nowTime.split('/').join('')
      localStorage.setItem('signInNum', signInNum)
    },
    // 签到
    signInClick () {
      signIn()
        .then(() => {
          this.setSignIn()
          this.signIn = true
          this.$toast('签到成功')
        })
        .catch(err => {
          if (err.response.status === 400) {
            this.setSignIn()
            this.signIn = true
            this.$toast('今天已签到')
          }
        })
    }
  }
}
</script>
<style lang='scss' scoped>
.popup-top {
  display: flex;
  justify-content: center;
  width: 100%;
  // 未登录内容
  .not-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 88%;
    height: 3.6rem;
    line-height: .5rem;
    font-size: .24rem;
    color: rgb(99, 97, 97);
    .title-btn {
      width: 2.2rem;
      height: .6rem;
      padding: 0 .3rem;
      margin-top: .45rem;
      font-size: 3.4vw;
      color: rgb(112, 111, 111);
      background-color: #f3f3f3;
      border: .02rem solid #aaa;
      &:active {
        border: none;
        color: black;
        font-weight: bold;
      }
    }
  }
  // 已登录内容
  .logining {
    display: flex;
    justify-content: space-between;
    width: 88%;
    height: 3.6rem;
    padding: 1rem 0 .5rem;
    box-sizing: border-box;
    .left-con {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 2;
      // 用户头像
      .account-bgi {
        width: 1.35rem;
        height: 1.35rem;
        border-radius: 50%;
      }
      // 用户信息
      .information {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        flex: 1;
        .account-nickname {
          font-size: .46rem;
          letter-spacing: -0.03rem;
        }
        .lv {
          display: flex;
          justify-content: center;
          align-items: center;
          width: .7rem;
          height: .38rem;
          margin-left: .15rem;
          color: rgb(121, 116, 116);
          font: {
            size: .2rem;
            weight: bold;
            style: italic;
          }
          background-color: rgb(219, 216, 216);
          border-radius: .2rem;
        }
      }
    }
    .right-btn {
      display: flex;
      align-items: flex-end;
      // 签到按钮
      .sign {
        width: 1rem;
        height: .45rem;
        font-size: .21rem;
        i {
          font-size: .2rem;
        }
      }
      // 已签到按钮
      .signed {
        width: 1.3rem;
        height: .48rem;
        padding: 0 0 0 .12rem;
        font-size: .2rem;
        color: rgb(99, 97, 97);
        border: .01rem solid rgba(0, 0, 0, .1);
        &:active {
          border: none;
          color: black;
        }
        i {
          font-size: .2rem;
        }
      }
    }
  }
}
</style>
