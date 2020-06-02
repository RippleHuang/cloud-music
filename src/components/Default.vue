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
  <van-popup v-model="visible" position="left" :style="{ width: '82%' }">
    <left-popup></left-popup>
  </van-popup>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>
</template>
<script>
import LeftPopup from 'components/LeftPopup'
export default {
  name: 'Default',
  data () {
    return {
      visible: false
    }
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
</style>
