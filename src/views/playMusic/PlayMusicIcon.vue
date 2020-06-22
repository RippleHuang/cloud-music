<template>
  <div class="music-icon">
    <i
      id="heart"
      class="iconfont"
      @click="changeLike(audioIngSong.id)"
      :class="{'icon-xindong2': !isLike, 'icon-xindongliang':isLike}"
    >
    </i>
    <i class="iconfont icon-xiazai" @click="unfinished"></i>
    <i class="iconfont icon-cailing" @click="unfinished"></i>
    <i class="iconfont icon-xinxi" @click="unfinished"></i>
    <i class="iconfont icon-gedanxinxi_" @click="changeTranslate"></i>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { likeMusic } from 'api/apis'
export default {
  name: 'PlayMusicIcon',
  props: {
    isLike: {
      type: Boolean
    },
    translate: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['audioIngSong'])
  },
  methods: {
    // 取消 添加 喜欢歌曲
    changeLike (id) {
      likeMusic(id, !this.isLike)
        .then(() => {
          const message = !this.isLike ? '已添加喜欢列表' : '已取消喜欢'
          this.$toast(message)
          this.$emit('update:isLike', !this.isLike)
        })
        .catch(() => {
          this.$toast('请求失败')
        })
    },
    unfinished () {
      this.$toast('心动与翻译可用,其他未实装,敬请期待')
    },
    changeTranslate () {
      this.$emit('update:translate', !this.translate)
      if (!this.translate) {
        this.$toast('已翻译')
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.music-icon {
  display: flex;
  justify-content: space-between;
  height: .8rem;
  padding: 0 .4rem;
  i {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    font-size: .45rem;
    color: white;
  }
  .icon-xindongliang {
    color: #dd001b;
  }
}
</style>
