<template>
<div class="home-container">
  <home-icons />
  <home-apply />
  <home-song-list :songListNum="songListNum" :refresh="refresh" @songList="_heartMode" />
</div>
</template>
<script>
import HomeIcons from './HomeIcons'
import HomeApply from './HomeApply'
import HomeSongList from './HomeSongList'
import { userInfo, heartMode } from 'api/apis'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'HomeIndex',
  data () {
    return {
      songListNum: {
        // 创建的歌单
        createNum: 0,
        // 收藏的歌单
        favoritesNum: 0
      },
      refresh: 0,
      heartModeList: []
    }
  },
  mounted () {
    if (this.loginState) {
      this.getUserInfo()
    }
  },
  /* 直接监听uid变化 */
  watch: {
    '$store.state.accountUid' (val, oldVal) {
      if (this.loginState) {
        this.getUserInfo()
        // 通知后代组件刷新
        this.refresh = +new Date()
      }
    }
  },
  computed: {
    ...mapGetters(['loginState'])
  },
  methods: {
    ...mapActions(['startPlayAll']),
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
    },
    // 开启心动模式
    _heartMode (val) {
      heartMode(val.id, val.pid)
        .then(data => {
          this.ruleModeList(data.data, 'songInfo')
          this.startPlayAll({
            list: this.heartModeList
          })
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    // 对请求到的心动模式数据进行修改，使得可以播放
    ruleModeList (arr, item) {
      arr.forEach(ele => {
        this.heartModeList.push(ele[item])
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
