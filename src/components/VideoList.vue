<template>
  <div class="video">
    <div class="video-for on-touch" v-for="(item, index) in data" :key="index">
      <div class="img-info">
        <span class="tag">
          <i class="iconfont icon-gedanbofangliang_"></i>
          {{item.playTime | filterPlayCount}}
        </span>
        <img :src="item.coverUrl + '?param=150y250'" alt />
      </div>
      <div class="info">
        <p class="name van-multi-ellipsis--l2">{{ item.title }}</p>
        <p class="artist van-ellipsis">
          <span class="time">{{item.durationms | filterSetTime}} by</span>
          <span class="creator" v-for="(item, index) in item.creator" :key="index">{{item.userName}}</span>
        </p>
      </div>
      <div class="artists-compile">
        <i class="iconfont icon-sandian"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VideoList',
  props: {
    data: {
      type: Array
    }
  }
}
</script>
<style lang='scss' scoped>
.video-for {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .1rem .3rem;
  .img-info {
    position: relative;
    width: 2.6rem;
    height: 1.5rem;
    .tag {
      position: absolute;
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
    img {
      width: 2.6rem;
      height: 1.5rem;
      border-radius: .1rem;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    width: 3.2rem;
    padding: 0 .15rem;
    .name {
      color: black;
      font-size: .3rem;
    }
    .artist {
      padding-top: .1rem;
      font-size: .24rem;
      color: #aaa;
    }
  }
}
</style>
