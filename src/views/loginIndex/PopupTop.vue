<template>
  <div class="popup-top">
    <!-- 未登录 -->
    <div class="not-login">
      <p>登录网易云音乐</p>
      <p>手机电脑多端同步，尽享海量高品质音乐</p>
      <!-- 监听原生事件 使用native修饰-->
      <van-button class="title-btn" round type="info" to="/login">立即登录</van-button>
    </div>
    <!-- 已登录 -->
    <div class="logining" v-show="false">
      <div class="left-con">
        <img class="account-bgi" src="../../assets/3.jpg" alt />
        <div class="information">
          <span class="account-nickname">名字</span>
          <span class="lv">Lv.1</span>
        </div>
      </div>
      <div class="right-btn">
        <!-- 防止冒泡 -->
        <van-button
          type="danger"
          size="small"
          round
          class="sign"
        >
          <i class="iconfont icon-tubiaozhizuo-"></i>签到
        </van-button>
        <van-button size="small" class="signed" round v-show="false">
          已签到
          <i class="iconfont icon-arrow-right"></i>
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PopupTop'
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
          width: .7rem;
          height: .38rem;
          margin-left: .15rem;
          line-height: .38rem;
          text-align: center;
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
        width: 1.2rem;
        height: .45rem;
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
