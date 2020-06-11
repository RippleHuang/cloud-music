<template>
  <li class="song-list">
    <div class="left">
      <div class="list-cover">
        <img v-lazy="coverImgUrl" alt="" />
        <div v-if="privacy !== 0" class="mask"></div>
        <i class="iconfont icon-icon-system-fn-lock" v-if="privacy !== 0"></i>
      </div>
      <div class="list-info">
        <!-- 默认会显示用户姓名,需要替换 我喜欢的音乐样式调整 -->
        <p class="list-title van-ellipsis" :class="{ first:myLove }">{{myLove?'我喜欢的音乐':name}}</p>
        <p class="list-num">
          {{trackCount}}首
          <span v-if="creatorNickname !== ''" class="nickname">by {{creatorNickname}}</span>
        </p>
      </div>
    </div>
    <div class="compile">
      <van-button v-if="myLove" class="title-btn" round type="info" @click.stop>
        <i class="iconfont icon-xindong"></i>心动模式
      </van-button>
      <i v-else class="iconfont icon-sandian on-touch"></i>
    </div>
  </li>
</template>
<script>
export default {
  name: 'SongList',
  props: {
    coverImgUrl: {
      type: String
    },
    name: {
      type: String
    },
    trackCount: {
      type: Number
    },
    creatorNickname: {
      type: String,
      default: ''
    },
    privacy: {
      type: Number
    },
    myLove: {
      type: Boolean
    }
  }
}
</script>
<style lang='scss' scoped>
// 左侧图像
.list-cover {
  position: relative;
  img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    background: rgba(0, 0, 0, 0.8);
    border-radius: .1rem;
  }
  .icon-icon-system-fn-lock {
    position: absolute;
    right: .26rem;
    bottom: .23rem;
    color: #fff;
    width: .25rem;
    height: .25rem;
    font-size: .3rem;
  }
  .mask {
    position: absolute;
    right: .225rem;
    bottom: .1rem;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 .5rem .5rem;
    border-color: transparent transparent rgba(0, 0, 0, .6) transparent;
  }
}
// 心动按钮
.compile {
  display: flex;
  align-items: center;
  flex: 1;
  height: 1.2rem;
  padding-right: .225rem;
  font-size: .24rem;
  .title-btn {
    width: 1.75rem;
    height: .5rem;
    line-height: .5rem;
    padding: 0 .1rem;
    font-size: 3vw;
    color: black;
    background-color: #fff;
    border: .01rem solid rgba(0, 0, 0, .1);
    .icon-xindong {
      font-size: .24rem;
      margin-right: .05rem;
    }
    &:active {
      border: none;
    }
  }
}
</style>
