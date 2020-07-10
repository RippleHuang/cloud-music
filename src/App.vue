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
    <!-- 加载 -->
    <div id="load">
      <p class="load-title">音樂的力量</p>
      <p class="load-bottom">
        <span class="load-icon"><i class="iconfont icon-551488821353490553221"></i></span>
        网易云音乐
      </p>
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
      transition: '',
      timer: ''
    }
  },
  mounted () {
    if (!sessionStorage.getItem('load')) this.loadLogo()
  },
  watch: {
    // 进入展示歌单时可以缓存,离开时销毁
    $route (to, from) {
      if (to.path === '/showsong' || to.path === '/userInfo') {
        this.exclude = false
      } else {
        this.exclude = true
      }
    }
  },
  methods: {
    // 刷新
    reload () {
      this.isReload = false
      this.$nextTick(function () {
        this.isReload = true
      })
    },
    // 加载
    loadLogo () {
      const load = document.getElementById('load')
      load.style.display = 'block'
      // 保存,关闭网页后自动销毁
      sessionStorage.setItem('load', 'load')
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        load.style.display = 'none'
      }, 4000)
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
  position: relative;
  // 禁止文字被选中
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  .container {
    position: relative;
  }
  #load {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2020;
    display: none;
    width: 100vw;
    height: 100vh;
    font-size: .6rem;
    color: #fff;
    background-color: #dd001b;
    overflow: hidden;
    .load-title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
    }
    .load-bottom {
      font-size: .4rem;
      text-align: center;
      opacity: 0;
      animation: icon 3s both;
      i {
        font-size: .45rem;
      }
    }
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
@keyframes icon {
  100% {
    opacity: 1;
  }
}
</style>
