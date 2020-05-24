<template>
  <div class="swiper-con">
    <van-swipe :autoplay="5000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swipe-img" v-lazy="image" />
        <span class="title">123456</span>
      </van-swipe-item>
    </van-swipe>
    <div class="mask"></div>
  </div>
</template>
<script>
export default {
  name: 'Swiper',
  data () {
    return {
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper-con {
  position: relative;
  width: 100%;
  height: 3rem;
  .mask {
    position: absolute;
    top: -0.01rem;
    z-index: -3;
    width: 100%;
    height: 2.4rem;
    background-color: #dd001b;
  }
  .van-swipe {
    width: 100%;
    height: 3rem;
    padding: .15rem .25rem 0;
    box-sizing: border-box;
    overflow: hidden;
    .swipe-img {
      width: 92.8%;
      height: 100%;
      border-radius: .1rem;
    }
    .van-swipe-item {
      position: relative;
      .title {
        position: absolute;
        display: block;
        right: .52rem;
        bottom: 0;
        color: #fff;
        background-color: rgb(221, 0, 27, .9);
        font-size: smaller;
        padding: 3px 6px;
        opacity: 0.8;
        border-top-left-radius: .1rem;
        border-bottom-right-radius: .1rem;
      }
    }
  }
}
</style>
