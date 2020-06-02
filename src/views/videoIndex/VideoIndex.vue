<template>
  <div>
    <nav-bar :list="chooseListTag"></nav-bar>
    <keep-alive>
      <router-view class="router-view" style="height: 87vh; overflow-y: scroll;"></router-view>
    </keep-alive>
  </div>
</template>
<script>
import NavBar from 'components/NavBar'
export default {
  name: 'VideoIndex',
  data () {
    return {
      chooseListTag: [
        {
          path: '/video/recommend',
          text: '推荐'
        }, {
          path: '/video/listenBgm',
          text: '听BGM'
        }, {
          path: '/video/life',
          text: '生活'
        }, {
          path: '/video/dance',
          text: '舞蹈'
        }, {
          path: '/video/acg',
          text: 'ACG音乐'
        }, {
          path: '/video/plaza',
          text: '广场'
        }, {
          path: '/video/game',
          text: '游戏'
        }
      ],
      list: [{
        id: 0
      }]
    }
  },
  components: {
    NavBar
  }
}
</script>
<style>

</style>
