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
import { userInfo } from 'api/apis'
import { mapGetters } from 'vuex'
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
    if (this.loginState) {
      this.getUserInfo()
    }
  },
  computed: {
    ...mapGetters(['loginState'])
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      userInfo()
        .then(data => {
          // 创建的歌单数
          this.songListNum.createNum = data.createdPlaylistCount
          // 收藏的歌单数
          this.songListNum.favoritesNum = data.subPlaylistCount
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
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
