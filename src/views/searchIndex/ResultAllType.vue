<template>
  <div class="result-all-type">
    <!-- 单曲 -->
    <!-- (item.album || {}).name 防止报错 undefined -->
    <div class="title" v-if="data.song">
      单曲
      <span class="play" @click="$store.dispatch('startPlayAll', { list: (data.song || {}).songs })">
        <i class="iconfont icon-bofang1"></i>
        播放全部
      </span>
    </div>
    <ul class="song-group">
      <song-list-li
        v-for="(item, index) in (data.song || {}).songs" :key="index"
        songShow
        :number="index+1"
        :active="item.id === audioIngSong.id"
        :artists="item.ar"
        :albumName="item.al.name"
        :name="item.name"
        :privacy="0"
        home
        @playSong="$store.dispatch('addToAudioList', item)"
      />
    </ul>
    <div class="more on-touch" v-if="(data.song || {}).moreText" @click="moreList(1)">{{(data.song || {}).moreText}}&nbsp;&gt;</div>
    <!-- 歌单 -->
    <!-- (item.creator || {}).nickname 防止报错 undefined -->
    <div class="title" v-if="data.playList">歌单</div>
    <ul class="song-group">
      <song-list-li
        v-for="(item, index) in (data.playList || {}).playLists" :key="index"
        :coverImgUrl="item.coverImgUrl"
        :name="item.name"
        :trackCount="item.trackCount"
        :creatorNickname="(item.creator || {}).nickname"
        userInfo
        :privacy="0"
        :playCount="item.playCount"
        @click.native="$router.push(`/showsong?albumId=${item.id}`)"
      />
    </ul>
    <div class="more on-touch" v-if="(data.playList || {}).moreText" @click="moreList(2)">{{(data.playList || {}).moreText}}&nbsp;&gt;</div>
    <!-- 视频 -->
    <div class="title" v-if="data.video">视频</div>
    <video-list
      :data="(data.video || {}).videos"
      search
    />
    <div class="more on-touch" v-if="(data.video || {}).moreText" @click="moreList(3)">{{(data.video || {}).moreText}}&nbsp;&gt;</div>
    <!-- 相关搜索 -->
    <div class="title" v-if="data.sim_query">相关搜索</div>
    <div class="sim-query">
      <span
        class="sim-keyword"
        v-for="(item, index) in (data.sim_query || {}).sim_querys" :key="index"
        @click="searchSim(item.keyword)"
      >
      {{item.keyword}}
      </span>
    </div>
    <!-- 歌手 -->
    <div class="title" v-if="data.artist">歌手</div>
    <artists-or-user
      :data="(data.artist || {}).artists"
      songer
    />
    <div class="more on-touch" v-if="(data.artist || {}).moreText" @click="moreList(4)">{{(data.artist || {}).moreText}}&nbsp;&gt;</div>
    <!-- 专辑 -->
    <div class="title" v-if="data.album">专辑</div>
    <ul class="song-group">
      <song-list-li
        v-for="(item, index) in (data.album || {}).albums" :key="index"
        :coverImgUrl="item.picUrl"
        :name="item.name"
        :artists="item.artists"
        :trackCount="item.size"
        :publishTime="item.publishTime"
        :privacy="0"
        :id="item.id"
        @click.native="$router.push(`/showsong?dishId=${item.id}`)"
      />
    </ul>
    <div class="more on-touch" v-if="(data.album || {}).moreText" @click="moreList(5)">{{(data.album || {}).moreText}}&nbsp;&gt;</div>
    <!-- 用户 -->
    <div class="title" v-if="data.user">用户</div>
    <artists-or-user
      :data="(data.user || {}).users"
      user
    />
    <div class="more on-touch" v-if="(data.user || {}).moreText" @click="moreList(6)">{{(data.user || {}).moreText}}&nbsp;&gt;</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SongListLi from 'components/SongListLi'
import ArtistsOrUser from 'components/ArtistsOrUser'
import VideoList from 'components/VideoList'
export default {
  name: 'ResultAllType',
  props: ['data'],
  computed: {
    ...mapGetters(['audioIngSong'])
  },
  methods: {
    moreList (active) {
      this.$emit('update:active', active)
    },
    searchSim (keyword) {
      // 保存搜索历史
      this.$store.commit('SET_HISTORY', keyword)
      this.$emit('searchSim', keyword)
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
.result-all-type {
  padding-top: 1.2rem;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .3rem .28rem .1rem;
    height: .6rem;
    font-size: .34rem;
    font-weight: bold;
    .play {
      padding: .1rem .15rem;
      line-height: .32rem;
      border: .01rem solid #eee;
      border-radius: .3rem;
      font-size: .24rem;
      font-weight: 500;
      &:active {
        border: none;
        background-color: rgba(0, 0, 0, .1);
      }
    }
    .icon-bofang1 {
      padding-right: 0.1rem;
      font-size: .24rem;
    }
  }
  .sim-query {
    display: flex;
    flex-wrap: wrap;
    padding: 0 .3rem .2rem;
    .sim-keyword {
      height: .6rem;
      padding: 0 .2rem;
      margin: .3rem .3rem 0 0;
      line-height: .6rem;
      text-align: center;
      color: black;
      background-color: rgb(236, 231, 231);
      border-radius: .3rem;
    }
  }
  .more {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: rgb(65, 62, 62);
  }
}
</style>
