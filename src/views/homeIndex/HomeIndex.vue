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
import { userInfo } from '@/api/apis'
export default {
  name: 'HomeIndex',
  data () {
    return {
      songListNum: {
        // 创建的歌单
        createNum: 0,
        // 收藏的歌单
        favoritesNum: 0
      }
    }
  },
  mounted () {
    this._getInfo()
  },
  methods: {
    _getInfo () {
      const date = +new Date()
      userInfo(date).then(data => {
        // 更新创建的歌单数
        this.songListNum.createNum = data.createdPlaylistCount
        // 更新收藏的歌单数
        this.songListNum.favoritesNum = data.subPlaylistCount
        console.log(this.songListNum)
      })
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
