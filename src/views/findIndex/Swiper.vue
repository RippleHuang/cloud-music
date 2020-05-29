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
  height: 2.75rem;
  .mask {
    position: absolute;
    top: -0.03rem;
    z-index: -3;
    width: 100%;
    height: 2.3rem;
    background: linear-gradient(to right, #db3e35, #dd001b);
  }
  .van-swipe {
    width: 100%;
    height: 2.75rem;
    padding: .15rem .25rem 0;
    box-sizing: border-box;
    overflow: hidden;
    .swipe-img {
      width: 92.8%;
      height: 100%;
      border-radius: .15rem;
    }
    .van-swipe-item {
      position: relative;
      .title {
        position: absolute;
        display: block;
        right: .518rem;
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
