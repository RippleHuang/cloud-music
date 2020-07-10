<template>
  <div class="popup-top">
    <!-- 未登录 -->
    <div class="not-login" v-if="!loginState">
      <p>登录网易云音乐</p>
      <p>手机电脑多端同步，尽享海量高品质音乐</p>
      <van-button class="title-btn" round type="info" @click="toPass">立即登录</van-button>
    </div>
    <!-- 已登录 -->
    <div class="logining" v-if="loginState" @click="$router.push(`/userInfo?accountUid=${accountUid}`)">
      <div class="left-con">
        <img class="account-bgi" :src="avatarUrl" alt />
        <div class="information">
          <span class="account-nickname">{{nickName}}</span>
          <span class="lv">Lv.{{level}}</span>
        </div>
      </div>
      <div class="right-btn">
        <!-- 防止冒泡 -->
        <span
          class="sign"
          @click.stop="signInClick"
          v-show="!getSign"
        >
          <i class="iconfont icon-tubiaozhizuo-"></i>签到
        </span>
        <span
          class="signin"
          v-show="getSign"
          @click.stop="signInClick"
        >
          已签到
          <i class="iconfont icon-arrow-right"></i>
        </span>
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
  props: {
    visible: {
      type: Boolean
    }
  },
  data () {
    return {
      // 默认未签到
      signIn: false
    }
  },
  computed: {
    ...mapGetters(['loginState', 'level', 'nickName', 'avatarUrl', 'accountUid'])
  },
  watch: {
    visible (val, oldV) {
      if (val) this.getSign()
    }
  },
  methods: {
    toPass () {
      // 默认有体验按钮
      this.$router.push({ path: '/login', query: { login: localStorage.getItem('login') || 'login' } })
    },
    // 确定是否签到
    getSign () {
      const date = new Date()
      const nowTime = format(date).slice(0, 10) // 截取当前日期 yyyy.mm.dd
      // 把日期转化为数值 转化为数字
      const nowSign = +nowTime.split('.').join('')
      // 有本地记录
      if (localStorage.getItem('signIn')) {
        const local = JSON.parse(localStorage.getItem('signIn'))
        // 遍历数组中的对象
        var getAccountUid = []
        var getSignInNum = []
        local.forEach((val, index) => {
          getAccountUid[index] = val.accountUid
          getSignInNum[index] = val.signInNum
        })
        if (getAccountUid.includes(this.accountUid)) {
          // 通过位置找到对应的最后签到时间
          const lastSign = getSignInNum[getAccountUid.indexOf(this.accountUid)]
          this.signIn = !(nowSign > lastSign)
        } else { // 无则默认未签到
          this.signIn = false
        }
      } else { // 无则直接api验证并保存记录
        signIn()
          .then(() => {
            return false
          })
          .catch(err => {
            if (err.response.status === 400) {
              this.signIn = true
              this.setSignIn()
            }
          })
      }
    },
    // 用户信息页
    userInfo () {
      this.$router.push('/userInfo')
    },
    // 保存最后签到时间
    setSignIn () {
      const date = new Date()
      const nowTime = format(date).slice(0, 10) // 截取当前日期
      // 把日期转化为数值,uid 保存到localStorage
      const signInNum = +nowTime.split('.').join('')
      var newO = { signInNum, accountUid: this.accountUid }
      if (localStorage.getItem('signIn')) {
        var arr = []
        // 得到存储值
        const oldA = JSON.parse(localStorage.getItem('signIn'))
        oldA.forEach(val => {
          arr.push(val)
        })
        // 数组反转
        var sign = arr.concat([newO]).reverse()
        // 数组对象去重
        var result = []
        var obj = {}
        for (var i = 0; i < sign.length; i++) {
          if (!obj[sign[i].accountUid]) {
            result.push(sign[i])
            obj[sign[i].accountUid] = true
          }
        }
        localStorage.setItem('signIn', JSON.stringify(result))
      } else {
        localStorage.setItem('signIn', JSON.stringify([newO]))
      }
    },
    // 签到
    signInClick () {
      signIn()
        .then(() => {
          this.setSignIn()
          if (this.signIn) {
            this.$toast('今天已签到')
          } else {
            this.$toast('签到成功')
            this.signIn = true
          }
          this.reload()
        })
        .catch(() => {
          this.setSignIn()
          this.signIn = true
          this.$toast('今天已签到')
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
        line-height: .45rem;
        text-align: center;
        font-size: .21rem;
        color: #fff;
        border-radius: .4rem;
        background-color: #dd001b;
        i {
          font-size: .2rem;
        }
      }
      // 已签到按钮
      .signin {
        width: 1.3rem;
        height: .48rem;
        line-height: .48rem;
        text-align: center;
        font-size: .2rem;
        color: rgb(99, 97, 97);
        border: .01rem solid rgba(0, 0, 0, .1);
        border-radius: .5rem;
        &:active {
          border: none;
          color: #fff;
          background-color: rgba(0, 0, 0, .1);
        }
        i {
          font-size: .2rem;
        }
      }
    }
  }
}
</style>
