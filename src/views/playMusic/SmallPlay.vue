<template>
<footer class="small-play van-hairline--top">
  <div class="music" @click="returnFull">
    <div class="img-info" ref="circle">
      <img :src="imgUrl">
    </div>
    <div class="music-info">
      <p class="music-name">{{name}}</p>
      <p class="music-lrc van-ellipsis" v-show="nowLyric">{{ nowLyric }}</p>
      <p class="music-lrc van-ellipsis" v-show="!nowLyric">
        <span class="nickname" v-for="(item, index) in artist" :key="index">
          {{item.name}}
        </span>
      </p>
    </div>
  </div>
  <div class="func">
    <div class="left on-touch"  @click="play">
      <van-circle
        v-model="currentRate"
        size="7.5vw"
        color="#d03c32"
        :layer-color="color"
        :stroke-width="55"
      >
        <i
          class="iconfont"
          :class="{'icon-gedanbofangliang_': !playState, 'icon-zantingtingzhi': playState}"
        >
        </i>
      </van-circle>
    </div>
    <div class="right on-touch" @click="showAudioList">
      <i class="iconfont icon-icon-test"></i>
    </div>
  </div>
</footer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SmallPlay',
  props: {
    imgUrl: {
      type: String
    },
    name: {
      type: String
    },
    artist: {
      type: Array
    },
    progressWidth: {
      type: Number
    },
    nowLyric: {
      type: String
    }
  },
  data () {
    return {
      currentRate: 0,
      color: '#999696'
    }
  },
  computed: {
    ...mapGetters(['playState'])
  },
  watch: {
    playState: function (val) {
      this.$refs.circle.style.animationPlayState = val ? 'running' : 'paused'
    },
    progressWidth: function (val) {
      this.currentRate = val
    }
  },
  methods: {
    play () {
      this.color = this.playState ? '#1f1e1e' : '#999696'
      this.$emit('play')
    },
    returnFull () {
      this.$store.commit('SET_FULL_SCREEN', true)
    },
    showAudioList () {
      this.$emit('showAudioList')
    }
  }
}
</script>
<style lang="scss" scoped>
.small-play {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1rem;
  background-color: #fff;
  overflow: hidden;
  .music {
    display: flex;
    justify-content: space-between;
    .img-info {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1rem;
      height: 1rem;
      animation: rotating 22s linear infinite;
      transform-origin: center;
      img {
        width: 80%;
        height: 80%;
        border-radius: 50%;
      }
    }
    .music-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 1rem;
      width: 60vw;
      overflow: hidden;
      // 歌名
      .music-name {
        margin: 0;
        padding: .03rem 0 .02rem;
        font-size: .28rem;
        white-space: nowrap;
        overflow: hidden;
        animation: 15s wordsLoop linear infinite normal;
      }
      // 歌词
      .music-lrc {
        width: 60vw;
        margin: .08rem 0 0;
        padding-bottom: .08rem;
        font-size: .22rem;
        color: #999696;
        overflow: hidden;
        .nickname {
          padding-bottom: .08rem;
          font-size: .22rem;
          color: #7f7f7f;
          &::before {
            content: "/";
            font-size: .2rem;
          }
          &:first-of-type::before {
            content: "";
          }
        }
      }
    }
  }
  .func {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    height: 1rem;
    .left {
      @extend .right;
      .van-circle {
        display: flex;
        justify-content: center;
        align-items: center;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        letter-spacing: 0;
        i {
          font-size: .28rem;
        }
        .icon-zantingtingzhi {
          color: #dd001b;
        }
      }
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      height: 1rem;
      .icon-icon-test {
        font-size: .5rem;
      }
    }
  }
  .music:active, .music:active + .func {
    background-color: #e1e1e4;
  }
}
// 图片旋转
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
// 歌名循环滚动
@keyframes wordsLoop {
  0% {
    transform: translateX(60vw);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
