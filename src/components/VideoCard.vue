<template>
  <div class="video-item">
    <div class="videoInfo pd23">
      <img ref="videoImg" :src="coverUrl" alt />
      <span class="tag">{{ videoGroup ? videoGroup[0].name : ''}}</span>
      <span class="center-bofang">
        <i class="video videobofang1"></i>
      </span>
      <span class="go-count">
        <i class="video videobofang"></i>
        {{playTime | setCount}}
      </span>
      <span class="go-time">
        <i class="video videoyinlebofangxuanlvjiezou"></i>
        {{durationms | setTime}}
      </span>
    </div>
    <h1 class="title pd23">{{title}}</h1>
    <div class="bottom">
      <div class="creator">
        <div class="img-info">
          <img :src="creator.avatarUrl + '?param=50y50'" alt />
        </div>
        <span class="name">{{creator.nickname}}</span>
      </div>
      <div class="button">
        <!-- 点赞 -->
        <span class="praised">
          <i class="video videozan"></i>
          <i class="num">{{praisedCount | setCount}}</i>
        </span>
        <!-- 评论 -->
        <span class="comment" @click="toVideoCom(vid)">
          <i class="video videopinglun"></i>
          <i class="num">{{commentCount | setCount}}</i>
        </span>
        <!-- 分享 -->
        <span class="share">
          <i class="video videodiandiandian"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { filterPlayCount, filterSetTime } from 'utils/filters'
export default {
  name: 'VideoCard',
  props: {
    coverUrl: {
      type: Array
    },
    videoGroup: {
      type: Array
    },
    playTime: {
      type: Array
    },
    durationms: {
      type: Array
    },
    title: {
      type: Array
    },
    creator: {
      type: Array
    },
    praisedCount: {
      type: Array
    },
    commentCount: {
      type: Array
    }
  },
  data () {
    return {
      pause: '',
      play: '',
      timer: null,
      allTime: 0,
      progressWidth: 0
    }
  },
  filters: {
    setCount: function (val) {
      return filterPlayCount(val)
    },
    setTime: function (val) {
      return filterSetTime(val)
    }
  },
  methods: {

  }
}
</script>
<style lang='scss' scoped>

</style>
