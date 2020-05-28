<template>
<div>
  <nav class="nav-wrapper">
    <div class="nav-left">
      <van-icon name="wap-nav" color="#fff" />
    </div>
    <ul class="nav-center">
      <router-link tag="li" class="ripple" replace to="/home">我的</router-link>
      <router-link tag="li" class="ripple" replace to="/find">发现</router-link>
      <router-link tag="li" class="ripple" replace to="/friend">朋友</router-link>
      <router-link tag="li" class="ripple" replace to="/video">视频</router-link>
    </ul>
    <div class="nav-right">
      <router-link to="/search"><van-icon name="search" color="#fff" /></router-link>
    </div>
  </nav>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>
</template>
<script>
export default {
  name: 'Default'
}
</script>
<style lang="scss" scoped>
@mixin public {
  display: flex;
  align-items: center;
  width: 100%;
}
.nav-wrapper {
  @include public;
  position: sticky;
  top: 0;
  z-index: 5;
  justify-content: space-around;
  height: 1.2rem;
  line-height: 1.2rem;
  background: linear-gradient(to right, #db3e35, #dd001b);
  .van-icon {
    margin-top: -0.05rem;
    font-size: .5rem;
  }
  .nav-left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.2rem;
  }
  .nav-right {
    @extend .nav-left;
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
    li {
      width: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      border-radius: 50%;
      font-weight: bold;
      font-size: .3rem;
      color: rgba(255, 255, 255, .6);
    }
    .router-link-active {
      font-size: .34rem;
      color: white;
    }
  }
}
</style>
