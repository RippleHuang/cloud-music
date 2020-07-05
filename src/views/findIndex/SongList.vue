<template>
  <div class="song-list van-hairline--top">
    <div class="song-list-header">
      <h3 class="title">推荐歌单</h3>
      <van-button class="title-btn" round type="info" @click="$router.push('/songlistsquare')">歌单广场</van-button>
    </div>
    <div class="song-list-con">
      <img-card
        v-for="(item, index) in songList"
        :key="index"
        :imgUrl="item.picUrl || item.coverImgUrl"
        :dec="item.name"
        :playCount="item.playCount"
        @click.native="$router.push(`/showsong?albumId=${item.id}`)"
      />
    </div>
  </div>
</template>
<script>
import ImgCard from 'components/ImgCard'
export default {
  name: 'SongList',
  props: {
    songList: {
      type: Array
    }
  },
  data () {
    return {
      opacity: 0
    }
  },
  components: {
    ImgCard
  }
}
</script>
<style lang="scss" scoped>
.song-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 92.8%;
    height: 1.2rem;
    .title {
      font-size: .35rem;
      font-weight: 900;
    }
    .title-btn {
      position: relative;
      z-index: 2;
      width: 1.65rem;
      height: .5rem;
      padding: 0 .15rem;
      font-size: 3vw;
      color: #3d3d3d;
      background-color: #fff;
      border: 1px solid #eaeaea;
      &:active {
        border: none;
      }
    }
  }
  &-con {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 92.8%;
    height: 6.3rem;
  }
}
</style>
