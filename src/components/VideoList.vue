<template>
  <div class="video">
    <div
      class="video-for on-touch"
      v-for="(item, index) in data" :key="index"
      @click="$router.push(`/landscape?vid=${item.vid}&type=${item.type}`)"
    >
      <div class="img-info">
        <span class="tag">
          <i class="iconfont icon-gedanbofangliang_"></i>
          {{item.playTime | filterPlayCount}}
        </span>
        <img :src="item.coverUrl + '?param=300y150'" alt />
      </div>
      <div class="info" :style="{width: search ? '4rem' : '3.2rem'}">
        <p class="name van-multi-ellipsis--l2">{{ item.title }}</p>
        <p class="artist van-ellipsis">
          <span class="time">{{item.durationms | filterSetTime}} by</span>
          <!-- (creator || {}).userName 防止报错undefined-->
          <span class="creator" v-for="(creator, index) in item.creator" :key="index">{{(creator || {}).userName}}</span>
        </p>
      </div>
      <div class="artists-compile" v-if="!search">
        <i class="iconfont icon-sandian" @click.stop="no"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { filterPlayCount, filterSetTime } from 'utils/filters'
export default {
  name: 'VideoList',
  props: {
    data: {
      type: Array
    },
    search: {
      type: Boolean
    }
  },
  methods: {
    no () {
      this.$toast('暂不支持,敬请期待')
    }
  },
  filters: {
    filterPlayCount,
    filterSetTime
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
    padding: 0 .15rem;
    .name {
      color: black;
      line-height: 1.3;
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
