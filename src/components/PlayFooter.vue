<template>
<footer class="small-play">
  <div class="img-info">
    <img src="../assets/3.jpg">
  </div>
  <div class="music-info">
    <p class="music-name">这里是歌曲信息</p>
    <p class="music-lrc">这里是歌手信息</p>
  </div>
  <div class="func">
    <van-circle v-model="currentRate" :rate="30" :speed="100" size=".6rem" color="#df001b" layer-color="#a6a5a9">
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1rem;
  background-color: #fff;
  border-top: 1px solid #ebedf0;
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
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 1rem;
    .music-name {
      margin: 0;
      font-size: .35rem;
      overflow: hidden;
    }
    .music-lrc {
      margin: .15rem 0 0;
      font-size: .25rem;
      color: rgba(0, 0, 0, .6);
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
      padding: .095rem .115rem;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      i {
        height: 6vh;
        font-size: 6vw;
      }
    }
    .icon-icon-test {
      font-size: 9vw;
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
