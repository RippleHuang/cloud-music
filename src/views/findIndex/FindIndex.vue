<template>
  <div>
    <swiper />
    <findIcons />
    <song-list ref="songList" />
    <new-plate />
  </div>
</template>
<script>
import Swiper from './Swiper'
import FindIcons from './FindIcons'
import SongList from './SongList'
import NewPlate from './NewPlate'
export default {
  name: 'FindIndex',
  components: {
    Swiper,
    FindIcons,
    SongList,
    NewPlate
  }
}
</script>
<style lang="scss" scoped>

</style>
