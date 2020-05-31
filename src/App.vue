<template>
  <div id="app">
    <div class="container">
      <div class="content">
        <default></default>
      </div>
      <play-footer></play-footer>
    </div>
  </div>
</template>

<script>
import Default from './components/Default'
import PlayFooter from './components/PlayFooter'
export default {
  name: 'app',
  components: {
    Default,
    PlayFooter
  }
}
</script>

<style lang="scss" scoped>
* {
  letter-spacing: .005rem;
}
// 给头部底部留空 small-play的高度
#app {
  padding: 1.2rem 0 1rem;
  // 禁止文字被选中
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>
