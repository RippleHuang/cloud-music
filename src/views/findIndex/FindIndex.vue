<template>
  <div>
    <swiper></swiper>
    <apply></apply>
    <song-list ref="songList"></song-list>
    <new-plate></new-plate>
  </div>
</template>
<script>
import Swiper from './Swiper'
import Apply from './Apply'
import SongList from './SongList'
import NewPlate from './NewPlate'
export default {
  name: 'FindIndex',
  components: {
    Swiper,
    Apply,
    SongList,
    NewPlate
  }
}
</script>
<style>

</style>
