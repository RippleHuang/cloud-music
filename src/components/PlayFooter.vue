<template>
<footer class="small-play van-hairline--top on-touch">
  <div class="img-info">
    <img src="../assets/3.jpg">
  </div>
  <div class="music-info">
    <p class="music-name">这里是歌曲信息</p>
    <p class="music-lrc">这里是歌手信息</p>
  </div>
  <div class="func">
    <van-circle v-model="currentRate" :rate="30" :speed="100" size=".6rem" color="#d03c32" layer-color="#4c4c4c">
      <i class="iconfont icon-gedanbofangliang_"></i>
    </van-circle>
    <i class="iconfont icon-icon-test"></i>
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
  background-color: rgba(255, 255, 255, .9);
  overflow: hidden;
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
    flex: 2.39;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 1rem;
    .music-name {
      margin: 0;
      font-size: .28rem;
      overflow: hidden;
    }
    .music-lrc {
      margin: .08rem 0 0;
      font-size: .22rem;
      color: #7f7f7f;
      overflow: hidden;
    }
  }
  .func {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    height: 1rem;
    .van-circle {
      padding: .1rem .115rem;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      i {
        height: .42rem;
        font-size: .42rem;
      }
    }
    .icon-icon-test {
      font-size: .6rem;
    }
  }
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
