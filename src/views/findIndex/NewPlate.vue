<template>
  <div class="plate-list">
    <div class="plate-list-header">
      <span :class="{active:type==='plate'}" @click="type='plate'" class="title">新碟</span>
      <span :class="{active:type==='newSong'}" @click="type='newSong'" class="title2">新歌</span>
      <van-button v-show="type === 'plate'" class="title-btn" round type="info">更多新碟</van-button>
      <van-button v-show="type === 'newSong'" class="title-btn" round type="info">新歌推荐</van-button>
    </div>
    <loading style="height: 4.58rem; padding-bottom:2.58rem" v-show="loading" />
    <div class="plate-list-con" v-show="!loading">
      <div class="images-con" v-show="type==='plate'">
        <img-card
          v-for="(item, index) in dishList"
          :key="index"
          :imgUrl="item.picUrl"
          :dec="item.name"
        ></img-card>
      </div>
      <div class="images-con" v-show="type==='newSong'">
        <img-card
          v-for="(item, index) in newSongsList"
          :key="index"
          :imgUrl="item.album.blurPicUrl"
          :dec="item.name"
          :newPlatetype="type"
        ></img-card>
      </div>
    </div>
  </div>
</template>
<script>
import ImgCard from '@/components/ImgCard'
import Loading from '@/components/Loading'
import { newDish, newSongs } from '@/api/apis'
import { getRandomNumberArray } from '@/utils/randomNumberArray'
import { Toast } from 'vant'
export default {
  name: 'NewPlate',
  data () {
    return {
      dishList: [],
      newSongsList: [],
      type: 'plate',
      loading: true
    }
  },
  async created () {
    await this.getNewDish()
    await this.getNewSongs()
  },
  methods: {
    getNewDish () {
      newDish()
        .then(data => {
          this.dishList = getRandomNumberArray(data.albums, 3)
          this.loading = false
        })
        .catch(err => {
          Toast('加载失败,请稍后尝试')
          console.log(err)
        })
    },
    getNewSongs () {
      newSongs()
        .then(data => {
          this.newSongsList = getRandomNumberArray(data.data, 3)
          this.loading = false
        })
        .catch(err => {
          Toast('加载失败,请稍后尝试')
          console.log(err)
        })
    }
  },
  components: {
    ImgCard,
    Loading
  }
}
</script>
<style lang="scss" scoped>
.plate-list {
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
      padding-right: .15rem;
      color: rgba(0, 0, 0, .4);
      font-size: .278rem;
      border-right: 1px solid rgba(0, 0, 0, .1);
    }
    .title2 {
      margin: 0 0 0 -3.6rem;
      color: rgba(0, 0, 0, .4);
      font-size: .27rem;
    }
    .active {
      font-size: .35rem;
      font-weight: 900;
      color: rgba(0, 0, 0, .9);
    }
    .title-btn {
      width: 1.35rem;
      height: .5rem;
      padding: 0 .1rem;
      font-size: .23rem;
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
    justify-content: space-around;
    width: 100%;
    .images-con {
      display: flex;
      justify-content: space-between;
      width: 92.8%;
    }
  }
}
</style>
