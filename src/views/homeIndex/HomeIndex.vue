<template>
<div class="home-container">
  <home-icons />
  <home-apply />
  <home-song-list :index="songListNum" />
</div>
</template>
<script>
import HomeIcons from './HomeIcons'
import HomeApply from './HomeApply'
import HomeSongList from './HomeSongList'
export default {
  name: 'HomeIndex',
  data () {
    return {
      songListNum: {
        // 创建的歌单
        createNum: 28,
        // 收藏的歌单
        favoritesNum: 23
      }
    }
  },
  components: {
    HomeIcons,
    HomeApply,
    HomeSongList
  }
}
</script>
<style lang="scss" scoped>
</style>
