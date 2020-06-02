<template>
  <div class="popup-container">
    <div class="header">
      <div class="mask"></div>
      <div class="header-content">
        <p>登录网易云音乐</p>
        <p>手机电脑多端同步，尽享海量高品质音乐</p>
        <van-button class="title-btn" round type="info">立即登录</van-button>
      </div>
      <div class="card">
        <div class="left">
          <span>开通黑胶VIP</span>
          <span>新客仅5元</span>
        </div>
        <div class="right">
          <span>享超12项豪华特权</span>
          <span><i class="iconfont icon-gudianyinle"></i></span>
        </div>
      </div>
      <div class="header-icons">
        <div class="icon-list on-touch" v-for="(item, index) in PopupTopIcons" :key="index">
          <i :class="item.icon"></i>
          <span>{{item.text}}</span>
        </div>
      </div>
    </div>
    <div class="shop">
      <ul class="icons-list">
        <li v-for="(item, index) in PopupShopIcons" :key="index" class="list-item on-touch">
          <div class="content">
            <i :class="item.icon" class="item-icon"></i>
            <span class="item-text">{{item.text}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="app">
      <ul class="icons-list">
        <li v-for="(item, index) in PopupAppIcons" :key="index" class="list-item on-touch">
          <div class="content">
            <i :class="item.icon" class="item-icon"></i>
            <span class="item-text">{{item.text}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom van-hairline--top">
      <div class="icons on-touch" v-for="(item, index) in PopupBottomIcons" :key="index">
        <i :class="item.icon"></i>
        <span>{{item.text}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { PopupTopIcons, PopupShopIcons, PopupAppIcons, PopupBottomIcons } from 'getIcons/icons'
export default {
  name: 'LeftPopup',
  data () {
    return {
      PopupTopIcons: [],
      PopupShopIcons: [],
      PopupAppIcons: [],
      PopupBottomIcons: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.PopupTopIcons = PopupTopIcons()
      this.PopupShopIcons = PopupShopIcons()
      this.PopupAppIcons = PopupAppIcons()
      this.PopupBottomIcons = PopupBottomIcons()
    }
  }
}
</script>
<style lang='scss' scoped>
.popup-container {
  width: 100%;
  // 头部
  .header {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 6rem;
    // 底部背景
    .mask {
      position: absolute;
      top: 0;
      z-index: -3;
      width: 100%;
      height: 62%;
      background:  #f3f3f3;
    }
    // 头部内容
    &-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
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
        }
      }
    }
    // 头部卡片
    .card {
      display: flex;
      justify-content: space-between;
      width: 88%;
      height: 1.2rem;
      padding: .2rem 0 .2rem .2rem;
      box-sizing: border-box;
      background: linear-gradient(to right, #0c0c0c 0%, #444 100%);
      border-radius: .1rem;
      color: #fff;
      box-shadow: .1rem .1rem .35rem .1rem rgba(0, 0, 0, .1);
      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex: .8;
        box-sizing: border-box;
        border-right: .01rem solid rgba(255, 255, 255, .3);
        span:first-of-type {
          font-size: 3.8vw;
          font-weight: bold;
          color:  #f3cdc4;
        }
        span:last-of-type {
          font-size: 3.2vw;
          color:  rgba(255, 255, 255, .7);
        }
      }
      .right {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex: 1.5;
        span:first-of-type {
          font-size: 3.4vw;
        }
        span:last-of-type {
          display: flex;
          justify-content: center;
          align-items: center;
          width: .65rem;
          height: .65rem;
          border-radius: 50%;
          color: #f7ae9e;
          background-color: rgb(104, 102, 102);
          i {
            font-size: .34rem;
          }
        }
      }
    }
    // 头部图标
    &-icons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 88%;
      padding: .3rem 0 .5rem;
      .icon-list {
        padding: .2rem .05rem 0;
        i {
          margin-bottom: .15rem;
          color: red;
          font-size: .55rem;
        }
        span {
          font-size: .22rem;
        }
      }
    }
  }
  // 内容icon
  .icons-list {
    display: flex;
    flex-direction: column;
    .list-item {
      display: flex;
      justify-content: center;
      height: 1rem;
      .content {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 88%;
        .item-icon {
          display: flex;
          align-items: center;
          flex: 1.2;
          height: .8rem;
          font-size: .35rem;
        }
        .item-text {
          display: flex;
          align-items: center;
          flex: 8;
          height: .8rem;
          font-size: .28rem;
        }
      }
      &:first-of-type {
        .content {
          border-top: .01rem solid rgba(0, 0, 0, .1);
        }
      }
    }
  }
  // 底部
  .bottom {
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 1rem;
    background-color: #fff;
    .icons {
      display: flex;
      justify-content: center;
      flex: 1;
      height: 1rem;
      align-items: center;
      i {
        font-size: .35rem;
      }
      span {
        padding-left: .1rem;
        font-size: .28rem;
      }
    }
  }
}
</style>
