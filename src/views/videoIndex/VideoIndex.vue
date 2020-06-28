<template>
  <div class="video-index">
    <nav-bar :list="chooseListTag"></nav-bar>
    <router-view class="router-view" style="height: 87vh; overflow-y: scroll;"></router-view>
  </div>
</template>
<script>
import NavBar from 'components/NavBar'
import { VideoData } from '@/getNavBar/navBarData'
export default {
  name: 'VideoIndex',
  data () {
    return {
      chooseListTag: [],
      list: [{
        id: 0
      }]
    }
  },
  mounted () {
    this.chooseListTag = VideoData()
  },
  components: {
    NavBar
  }
}
</script>
<style>

</style>
