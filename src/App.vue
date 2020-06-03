<template>
  <div id="app">
    <div class="container">
      <div class="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <play-footer></play-footer>
    </div>
  </div>
</template>
<script>
import PlayFooter from 'components/PlayFooter'
export default {
  name: 'app',
  components: {
    PlayFooter
  }
}
</script>
<style lang="scss" scoped>
* {
  letter-spacing: .005rem;
}
#app {
  // 禁止文字被选中
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  .container {
    //底部播放条留空
    padding-bottom: 1rem;
  }
}
</style>
