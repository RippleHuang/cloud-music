<template>
  <div id="app">
    <div class="content">
      <default></default>
    </div>
    <play-footer></play-footer>
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
  letter-spacing: .02rem;
}
#app {
  width: 100vw;
  height: 100vh;
}
</style>
