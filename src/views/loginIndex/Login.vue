<template>
  <div class="login-mask">
    <div class="logo">
      <i class="iconfont icon-wangyiyunyinle1"></i>
    </div>
    <div class="login-btn">
      <van-button class="title-btn" round type="info" to="/logining">手机号登录</van-button>
    </div>
    <div class="login-icons">
      <span><i class="iconfont icon-weixin"></i></span>
      <span><i class="iconfont icon-qq"></i></span>
      <span><i class="iconfont icon-weibo"></i></span>
      <span><i class="iconfont icon-wangyi"></i></span>
    </div>
    <div class="text">
      <input type="checkbox" />同意
      <span>《用户协议》《隐私政策》《儿童隐私政策》</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login'
}
</script>
<style lang='scss' scoped>

</style>
