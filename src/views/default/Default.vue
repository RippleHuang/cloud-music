<template>
<div class="default-content">
  <nav class="nav-wrapper">
    <div class="nav-left on-touch" @click="visible = true">
      <van-icon class="left-icon" name="wap-nav" color="#fff" />
    </div>
    <ul class="nav-center">
      <router-link tag="li" class="ripple" replace to="/home">我的</router-link>
      <router-link tag="li" class="ripple" replace to="/find">发现</router-link>
      <router-link tag="li" class="ripple" replace to="/village">云村</router-link>
      <router-link tag="li" class="ripple" replace to="/video">视频</router-link>
    </ul>
    <div class="nav-right on-touch">
      <router-link to="/search"><van-icon name="search" color="#fff" /></router-link>
    </div>
  </nav>
  <van-popup v-model="visible" position="left" close-on-popstate :style="{ width: '82%' }">
    <left-popup :visible="visible" />
  </van-popup>
  <div class="view-content">
    <keep-alive>
      <router-view v-if="isReload"></router-view>
    </keep-alive>
  </div>
</div>
</template>
<script>
import LeftPopup from './LeftPopup'
export default {
  name: 'Default',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isReload: true,
      visible: false
    }
  },
  // 导航进入前关闭侧边栏
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$data.visible = false
    })
  },
  methods: {
    reload () {
      this.isReload = false
      this.$nextTick(function () {
        this.isReload = true
      })
    },
    goVideo () {
      if (this.$store.state.loginState) {
        this.$router.replace('/video')
      } else {
        this.$toast('需要登录')
      }
    }
  },
  // 导航离开前关闭侧边栏
  beforeRouteLeave (to, from, next) {
    this.visible = false
    next()
  },
  components: {
    LeftPopup
  }
}
</script>
<style lang="scss" scoped>
// 公共样式
@mixin public {
  display: flex;
  align-items: center;
  width: 100%;
}
.default-content {
  // 顶部导航留空
  padding-top: 1.2rem;
  .nav-wrapper {
    @include public;
    position: fixed;
    top: 0;
    z-index: 5;
    justify-content: space-around;
    height: 1.2rem;
    line-height: 1.2rem;
    background: #dd001b;
    .van-icon {
      margin-top: -0.05rem;
      font-size: .5rem;
    }
    .left-icon {
      margin-left: -0.23rem;
    }
    .nav-left {
      // flex 相对于其他灵活的项目进行扩展的量
      flex: 1.5;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.2rem;
      border-radius: 0 50% 50% 0;
    }
    .nav-right {
      @extend .nav-left;
      flex: 1.3;
      width: 1.065rem;
      height: 1.065rem;
      border-radius: 50%;
      a {
        display: flex;
        justify-content: center;
      }
    }
    .nav-center {
      @include public;
      flex: 6;
      justify-content: space-around;
      color: white;
      // 设置为圆是为了点击后的波纹效果
      li {
        width: 1.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        border-radius: 50%;
        font-weight: bold;
        font-size: .3rem;
        color: rgba(255, 255, 255, .6);
        transition: font-size .2s;
      }
      .router-link-active {
        font-size: .34rem;
        color: white;
        transition: font-size .2s;
      }
    }
  }
  .view-content {
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
