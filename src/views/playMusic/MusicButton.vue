<template>
  <div class="music-button">
    <i class="iconfont" :class="[modeClass]" @click.self="changeMode"></i>
    <i class="iconfont icon-xiangyiqu" @click.self="prev"></i>
    <i class="iconfont" @click="play" :class="[{ 'icon-bofang1': !playState }, { 'icon-zanting': playState }]"></i>
    <i class="iconfont icon-shangyiqu" @click.self="next"></i>
    <i class="iconfont icon-icon-test" @click.self="showAudioList"></i>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MusicButton',
  props: {
    mode: {
      type: Number
    }
  },
  computed: {
    ...mapGetters(['playState']),
    modeClass: function () {
      if (this.mode === 0) {
        return 'icon--lbxh'
      }
      if (this.mode === 1) {
        return 'icon-loop'
      } else {
        return 'icon-suijibofang-wangyiicon'
      }
    }
  },
  methods: {
    play () {
      this.$emit('play')
    },
    prev () {
      this.$emit('prev')
    },
    next () {
      this.$emit('next')
    },
    changeMode () {
      this.$emit('changeMode')
    },
    showAudioList () {
      this.$emit('showAudioList')
    }
  }
}
</script>
<style lang='scss' scoped>
.music-button {
  display: flex;
  justify-content: space-between;
  height: .8rem;
  padding: 0 .4rem .4rem;
  i {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    font-size: .45rem;
    color: white;
  }
  i:nth-of-type(3) {
    font-size: .7rem;
  }
}
</style>
