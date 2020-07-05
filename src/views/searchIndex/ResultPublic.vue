<template>
  <div class="result-public">
    <!-- 单曲 -->
    <ul class="song-group" v-if="active === 1 && data.length">
      <song-list-li
        v-for="(item, index) in data" :key="index"
        songShow
        :number="index+1"
        :active="item.id === audioIngSong.id"
        :artists="item.artists"
        :albumName="item.album.name"
        :name="item.name"
        :privacy="0"
        home
        @playSong="$store.dispatch('selectPlay', { list: data, index })"
      />
    </ul>
    <!-- 视频 -->
    <video-list
      v-else-if="active === 2 && data.length"
      :data="data"
    />
    <!-- 歌手 -->
    <artists-or-user
      v-else-if="active === 3 && data.length"
      :data="data"
    />
    <!-- 专辑 -->
    <ul class="song-group" v-else-if="active === 4 && data.length">
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
    <!-- 歌单 -->
    <ul class="song-group" v-else-if="active === 5 && data.length">
      <song-list-li
        v-for="(item, index) in data" :key="index"
        :coverImgUrl="item.coverImgUrl"
        :name="item.name"
        :trackCount="item.trackCount"
        :privacy="0"
        :playCount="item.playCount"
        @click.native="$router.push(`/showsong?albumId=${item.id}`)"
      />
    </ul>
    <!-- 用户 -->
    <artists-or-user
      v-else-if="active === 6 && data.length"
      :data="data"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SongListLi from 'components/SongListLi'
import ArtistsOrUser from 'components/ArtistsOrUser'
import VideoList from 'components/VideoList'
export default {
  name: 'ResultPublic',
  props: {
    data: {
      type: Array
    },
    active: {
      type: Number
    }
  },
  computed: {
    ...mapGetters(['audioIngSong'])
  },
  components: {
    SongListLi,
    ArtistsOrUser,
    VideoList
  }
}
</script>
<style lang='scss' scoped>
.result-public {
  padding-top: 1.2rem;
}
</style>
