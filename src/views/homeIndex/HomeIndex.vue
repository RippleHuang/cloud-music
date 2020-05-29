<template>
<div class="home-container">
  <home-icons />
  <home-apply />
  <home-song-list />
</div>
</template>
<script>
import HomeIcons from './HomeIcons'
import HomeApply from './HomeApply'
import HomeSongList from './HomeSongList'
export default {
  name: 'HomeIndex',
  components: {
    HomeIcons,
    HomeApply,
    HomeSongList
  }
}
</script>
<style lang="scss" scoped>
</style>
