<template>
  <div class="img-card">
    <span class="tag" v-if="playCount">
      <i class="iconfont icon-gedanbofangliang_"></i>
      {{playCount | filterPlayCount}}
    </span>
    <div class="img-con">
      <div class="mask"></div>
      <img class="image-con" v-lazy="imgUrl" alt="" />
    </div>
    <div class="dec van-multi-ellipsis--l2" >{{ dec }}</div>
  </div>
</template>
<script>
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
    }
  },
  filters: {
    filterPlayCount: function (value) {
      if (!value) {
        return ''
      }
      if (value > 100000000) {
        value = ((value / 100000000).toFixed(1)) + '亿'
      } else if (value > 10000) {
        value = Math.floor(value / 10000) + '万'
      }
      return value
    }
  }
}
</script>
<style lang="scss" scoped>
img[lazy=loading] {
  width: 100%;
  height: 100%;
}
img[lazy=loaded] {
  width: 100%;
  height: 100%;
}
.img-card {
  position: relative;
  width: 2.1rem;
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
      position: relative;
      right: -0.06rem;
      color: #fff;
      font-size: .23rem;
    }
  }
  .img-con {
    position: relative;
    border-radius: .15rem;
    overflow: hidden;
    .mask {
      position: absolute;
      width: 2.1rem;
      height: 2.1rem;
      z-index: 2;
      border-radius: .15rem;
      overflow: hidden;
      box-shadow: 0 12px 18px -8px rgb(110, 109, 109) inset;
    }
    .image-con {
      width: 2.1rem;
      height: 2.1rem;
    }
  }
  .dec {
    margin-top: .15rem;
    line-height: .25rem;
    font-size: .22rem;
  }
}
</style>
