<template>
  <div>
    <swiper></swiper>
    <apply></apply>
    <song-list ref="songList"></song-list>
    <new-plate></new-plate>
    <top-tip ref="tip">
      <span class="tips">提示</span>
    </top-tip>
  </div>
</template>
<script>
import Swiper from './Swiper'
import Apply from './Apply'
import SongList from './SongList'
import NewPlate from './NewPlate'
import TopTip from '../../components/TopTip'
export default {
  name: 'FindIndex',
  components: {
    Swiper,
    Apply,
    SongList,
    NewPlate,
    TopTip
  }
}
</script>
<style>

</style>
