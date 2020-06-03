<template>
<footer class="small-play van-hairline--top">
  <div class="music">
    <div class="img-info">
      <img src="../assets/3.jpg">
    </div>
    <div class="music-info">
      <p class="music-name van-ellipsis">这里是歌曲信息这里是歌名</p>
      <p class="music-lrc van-ellipsis">这里是歌词这里是歌词这里是歌词这里是歌词这里是歌词</p>
    </div>
  </div>
  <div class="func">
    <div class="left on-touch">
      <van-circle v-model="currentRate" :rate="30" :speed="100" size="7.5vw" color="#d03c32" layer-color="#4c4c4c">
        <i class="iconfont icon-gedanbofangliang_"></i>
      </van-circle>
    </div>
    <div class="right on-touch">
      <i class="iconfont icon-icon-test"></i>
    </div>
  </div>
</footer>
</template>
<script>
export default {
  name: 'PlayFooter',
  data () {
    return {
      currentRate: 0
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
  background-color: rgba(255, 255, 255, .96);
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
      animation: rotating 24s linear infinite;
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
        padding-top: .03rem;
        font-size: .28rem;
        white-space: nowrap;
        overflow: hidden;
        animation: 15s wordsLoop linear infinite normal;
      }
      // 歌词
      .music-lrc {
        width: 60vw;
        margin: .08rem 0 0;
        font-size: .22rem;
        color: #7f7f7f;
        overflow: hidden;
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
        padding: 1.6vw 1.7vw;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        letter-spacing: 0;
        .icon-gedanbofangliang_ {
          font-size: .32rem;
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
        font-size: .6rem;
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
