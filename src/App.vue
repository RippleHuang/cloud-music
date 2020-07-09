<template>
  <div id="app">
    <div class="container">
      <!-- 为迷你播放器留空 全屏播放器时隐藏 -->
      <div class="content"
        :class="{
          'small-height': $store.state.audioList.length,
          'hidden': $store.state.fullScreen
        }"
      >
        <keep-alive :exclude="[{'ShowSong': exclude, 'UserIndex': exclude}]">
          <router-view v-if="isReload"></router-view>
        </keep-alive>
      </div>
      <!-- 通过是否有播放列表控制显示 -->
      <play-music-index v-show="$store.state.audioList.length" />
    </div>
  </div>
</template>
<script>
import PlayMusicIndex from 'views/playMusic/PlayMusicIndex'
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isReload: true,
      show: false,
      exclude: false,
      transition: ''
    }
  },
  watch: {
    // 希望进入展示歌单时可以缓存,离开时销毁
    $route (to, from) {
      const exp = /showsong/g
      const exp1 = /userInfo/g
      if (exp.test(to.path) || exp1.test(to.path)) {
        this.exclude = false
      } else {
        this.exclude = true
      }
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
    PlayMusicIndex
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
    position: relative;
  }
}
// 一开始是不让 #app 滚动
// .no-scroll {
//   height: 100vh;
//   overflow: hidden;
// }
.hidden {
  display: none;
}
</style>
