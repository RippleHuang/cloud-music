<template>
  <div class="img-card" :style="{width}">
    <!-- 发现页面歌单显示播放数 -->
    <span class="tag" v-if="playCount">
      <i class="iconfont icon-gedanbofangliang_"></i>
      {{playCount | filterPlayCount}}
    </span>
    <div class="img-con">
      <!-- 发现页面新歌图标 -->
      <span class="newsong-icon" v-if="newPlatetype === 'newSong'">
        <i class="iconfont icon-bofang"></i>
      </span>
      <!-- 蒙版 -->
      <div class="mask on-touch"></div>
      <!-- 排行榜time更新 -->
      <span class="time" v-if="updateTime">{{ updateTime }}</span>
      <!-- 图片地址加上 ?param=数字y数字 可以控制尺寸 -->
      <img class="image-con" v-lazy="imgUrl + '?param=150y150'" alt="" @load="imgLoad" />
    </div>
    <div v-if="dec" class="dec van-multi-ellipsis--l2" >{{ dec }}</div>
  </div>
</template>
<script>
import { filterPlayCount } from 'utils/filters'
export default {
  name: 'ImgCard',
  props: {
    playCount: {
      type: Number
    },
    imgUrl: {
      type: String
    },
    dec: {
      type: String
    },
    albumId: {
      type: Number
    },
    newPlatetype: {
      type: String
    },
    width: {
      type: String
    },
    updateTime: {
      type: String
    }
  },
  filters: {
    filterPlayCount
  },
  methods: {
    imgLoad () {
      this.$emit('loadingImg', true)
    }
  }
}
</script>
<style lang="scss" scoped>
.img-card {
  position: relative;
  width: 31.5%;
  margin-bottom: .35rem;
  .tag {
    position: absolute;
    z-index: 3;
    top: .11rem;
    right: .11rem;
    font-size: .23rem;
    letter-spacing: 0;
    color: #fff;
    .icon-gedanbofangliang_ {
      color: #fff;
      font-size: .21rem;
    }
  }
  .time {
    position: absolute;
    left: .2rem;
    bottom: .2rem;
    font-size: .22rem;
    color: #fff;
  }
  .img-con {
    position: relative;
    border-radius: .1rem;
    overflow: hidden;
    .newsong-icon {
      position: absolute;
      top: 70%;
      right: 7.5%;
      z-index: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25%;
      height: 25%;
      border-radius: 50%;
      background-color: rgb(255, 255, 255, .8);
      overflow: hidden;
      .icon-bofang {
        display: flex;
        align-items: center;
        color: #dd001b;
        font-size: .25rem;
      }
    }
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      border-radius: .1rem;
      overflow: hidden;
      box-shadow: 0 12px 18px -8px rgb(110, 109, 109) inset;
    }
    .image-con {
      width: 100%;
    }
  }
  .dec {
    padding-top: .13rem;
    line-height: 1.2;
    box-sizing: border-box;
    font-size: 3.5vw;
    letter-spacing: none;
    // 字母不换行
    word-break: break-all;
  }
}
</style>
