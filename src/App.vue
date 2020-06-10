<template>
  <div id="app">
    <div class="container">
      <div class="content">
        <keep-alive>
          <router-view v-if="isReload"></router-view>
        </keep-alive>
      </div>
      <play-footer v-show="false"></play-footer>
    </div>
  </div>
</template>
<script>
import PlayFooter from 'components/PlayFooter'
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isReload: true
    }
  },
  methods: {
    reload () {
      this.isReload = false
      this.$nextTick(function () {
        this.isReload = true
      })
    }
  },
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
}
</style>
