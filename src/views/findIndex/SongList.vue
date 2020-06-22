<template>
  <div class="song-list van-hairline--top">
    <div class="song-list-header">
      <h3 class="title">推荐歌单</h3>
      <van-button class="title-btn" round type="info">歌单广场</van-button>
    </div>
    <loading :height="4.58" v-show="!loading"/>
    <div v-show="loading" class="song-list-con">
      <img-card
        v-for="(item, index) in songList"
        :key="index"
        :imgUrl="item.coverImgUrl"
        :dec="item.name"
        :playCount="item.playCount"
        :albumId="item.id"
        @loadingImg="loadingImg"
      />
    </div>
  </div>
</template>
<script>
import ImgCard from 'components/ImgCard'
import Loading from 'components/Loading'
import { recSongList } from 'api/apis'
import { getRandomNumberArray } from 'utils/randomNumberArray'
import { Toast } from 'vant'
export default {
  name: 'SongList',
  inject: ['reload'],
  data () {
    return {
      songList: [],
      loading: false
    }
  },
  methods: {
    getSongList () {
      recSongList()
        .then(data => {
          this.songList = getRandomNumberArray(data.playlists, 6)
        })
        .catch(() => {
          Toast('加载失败,请稍后尝试')
        })
    },
    loadingImg (data) {
      this.$nextTick(() => {
        this.loading = data
      })
    }
  },
  mounted () {
    this.getSongList()
  },
  components: {
    ImgCard,
    Loading
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
  }
}
</style>
