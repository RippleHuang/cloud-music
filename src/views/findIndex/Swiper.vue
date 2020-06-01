<template>
  <div class="swiper-con">
    <van-swipe :autoplay="5000">
      <van-swipe-item v-for="(image, index) in swiperList" :key="index">
        <img class="swipe-img" :src="image.pic" />
        <span class="title" :style="{background:image.titleColor}">{{image.typeTitle}}</span>
      </van-swipe-item>
    </van-swipe>
    <div class="mask"></div>
  </div>
</template>
<script>
import { bannerSwiper } from '@/api/apis'
export default {
  name: 'Swiper',
  data () {
    return {
      swiperList: []
    }
  },
  methods: {
    getBannerSwiper () {
      bannerSwiper()
        .then(data => {
          this.swiperList = data.banners
        })
    }
  },
  mounted () {
    this.getBannerSwiper()
  }
}
</script>
<style lang="scss" scoped>
.swiper-con {
  position: relative;
  width: 100%;
  height: 36%;
  .mask {
    position: absolute;
    top: -0.03rem;
    z-index: -3;
    width: 100%;
    height: 80%;
    background:  #dd001b;
  }
  .van-swipe {
    width: 100%;
    padding-top: .2rem;
    box-sizing: border-box;
    overflow: hidden;
    .van-swipe-item {
      display: flex;
      justify-content: center;
      .swipe-img {
        width: 92.8%;
        height: 100%;
        border-radius: .15rem;
      }
      .title {
        position: absolute;
        display: block;
        right: 3.65vw;
        bottom: 0;
        color: #fff;
        padding: .1rem .18rem;
        opacity: 0.9;
        border-radius: .15rem 0;
        font-size: smaller;
        letter-spacing: .01rem;
      }
    }
  }
}
</style>
