<template>
  <div class="container">
    <div class="login-nav">
      <span class="rollback on-touch" @click="rollback"><i class="iconfont icon-zuo"></i></span>
      <span class="title">{{name}}</span>
    </div>
    <div class="login-con">
      <!-- 通过绑定事件来获取子路由中的props值,且只有当视图渲染才得到props值 -->
      <router-view @viewData="initData"></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      name,
      click: true
    }
  },
  methods: {
    initData (data) {
      this.name = data
      // 手机号验证页面,手机号注册页面不需要回退
      if (this.name === '手机号验证' || this.name === '手机号注册') {
        this.click = false
      } else {
        this.click = true
      }
    },
    rollback () {
      if (this.click) {
        // 回退，类似 window.history.go(n)
        this.$router.go(-1)
      } else {
        this.$toast('该页面不能回退哦')
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.container {
  .login-nav {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.4rem;
    padding-left: .1rem;
    box-sizing: border-box;
    background-color: #dd001b;
    .rollback {
      display: flex;
      justify-content: center;
      align-items: center;
      width: .9rem;
      height: .9rem;
      border-radius: 50%;
      .icon-zuo {
        font-size: .38rem;
        color: #fff;
      }
    }
    .title {
      margin-top: .05rem;
      font-size: .36rem;
      color: #fff;
    }
  }
}
</style>
