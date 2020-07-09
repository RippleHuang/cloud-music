<template>
  <div class="public-page">
    <!-- 收藏的专辑 -->
    <ul class="song-group" v-if="active === 0 && data.length">
      <h2>收藏的专辑 <span>({{data.length}})</span></h2>
      <song-list-li
        v-for="(item, index) in typeData" :key="index"
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
    <artists-or-user
      v-else-if="active === 1 && data.length"
      :data="typeData"
      favorite
    />
    <!-- 收藏的视频 -->
    <video-list
      v-else-if="active === 2 && data.length"
      :data="typeData"
    />
    <!-- 收藏的专栏,Mlog -->
    <div class="empty" v-else>
      <i class="iconfont icon-kong"></i>
      <p>暂无内容</p>
    </div>
  </div>
</template>
<script>
import SongListLi from 'components/SongListLi'
import ArtistsOrUser from 'components/ArtistsOrUser'
import VideoList from 'components/VideoList'
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
  data () {
    return {
      typeData: []
    }
  },
  watch: {
    data: {
      deep: true,
      handler (val, oldV) {
        this.typeData = val
      },
      immediate: true
    }
  },
  methods: {
    no () {
      this.$toast('尚未实装,敬请期待')
    }
  },
  components: {
    SongListLi,
    ArtistsOrUser,
    VideoList
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
.empty {
  width: 100%;
  height: 70%;
  text-align: center;
  font-size: .32rem;
  .icon-kong {
    color: #dd001b;
    font-size: 3rem;
    -webkit-text-stroke: 4px #fff;
  }
}
</style>
