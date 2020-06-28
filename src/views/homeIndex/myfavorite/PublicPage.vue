<template>
  <div class="public-page">
    <!-- 收藏的专辑 -->
    <ul class="song-group" v-if="active === 0 && data.length">
      <h2>收藏的专辑 <span>({{data.length}})</span></h2>
      <song-list-li
        v-for="(item, index) in data" :key="index"
        :coverImgUrl="item.picUrl"
        :name="item.name"
        :artists="item.artists"
        :trackCount="item.size"
        :privacy="0"
        :id="item.id"
        home
        @click.native="$router.push(`/showsong?dishId=${item.id}`)"
      />
    </ul>
    <!-- 收藏的歌手 -->
    <div class="artists" v-else-if="active === 1 && data.length">
      <div class="artists-for on-touch" @click="no" v-for="(item, index) in data" :key="index">
        <div class="img-info">
          <img v-lazy="item.picUrl ? item.picUrl : item.coverUrl" alt />
        </div>
        <div class="info">
          <p class="name">{{ item.name }}</p>
          <div>
            <span class="artist">专辑：{{item.albumSize}}</span>
            <span class="text">MV：{{item.mvSize}}</span>
          </div>
        </div>
        <div class="artists-compile">
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
    </div>
    <!-- 收藏的视频 -->
    <div class="video" v-else-if="active === 2 && data.length">
      <div class="video-for" v-for="(item, index) in data" :key="index">
        <div class="img-info">
          <span class="tag">
            <i class="iconfont icon-gedanbofangliang_"></i>
            {{item.playTime | filterPlayCount}}
          </span>
          <img v-lazy="item.coverUrl" alt />
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
    <!-- 收藏的专栏,Mlog -->
    <div class="empty" v-else>
      <i class="iconfont icon-kong"></i>
      <p>暂无内容</p>
    </div>
  </div>
</template>
<script>
import SongListLi from 'components/SongListLi'
import { filterPlayCount, filterSetTime } from 'utils/filters'
export default {
  nam: 'PublicPage',
  props: {
    data: {
      type: Array
    },
    active: {
      type: Number
    }
  },
  methods: {
    no () {
      this.$toast('尚未实装,敬请期待')
    }
  },
  filters: {
    filterPlayCount,
    filterSetTime
  },
  components: {
    SongListLi
  }
}
</script>
<style lang='scss' scoped>
.song-group {
  h2 {
    margin: .2rem 0 .2rem .25rem;
    font-size: .35rem;
    color: black;
    span {
      font-size: .28rem;
      color: rgb(187, 184, 184);
    }
  }
}
.artists-for {
  display: flex;
  align-items: center;
  padding: .1rem .3rem;
  .img-info {
    width: 1rem;
    height: 1rem;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: .2rem;
    .name {
      font-size: .32rem;
      color: black;
    }
    .name,
    .artist,
    .text {
      line-height: 1.5;
    }
    .artist,
    .text {
      color: #999;
      font-size: .2rem;
    }
  }
  .icon-sandian {
    font-size: .33rem;
  }
}
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
.empty {
  width: 100%;
  height: 70%;
  text-align: center;
  font-size: .32rem;
  .icon-kong {
    color: #dd001b;
    font-size: 3rem;
  }
}
</style>
