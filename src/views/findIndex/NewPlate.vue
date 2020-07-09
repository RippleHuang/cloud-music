<template>
  <div class="plate-list">
    <div class="plate-list-header">
      <div class="header">
        <span :class="{ active: type === 'plate'}" @click="type='plate'" class="title">新碟</span>
        <span :class="{ active: type === 'newSong'}" @click="type='newSong'" class="title2">新歌</span>
      </div>
      <van-button
        v-show="type === 'plate'"
        class="title-btn"
        round
        type="info"
        @click="$router.push(`/newplates?total=${total}`)"
      >
        更多新碟
      </van-button>
      <van-button
        v-show="type === 'newSong'"
        class="title-btn"
        round
        type="info"
        @click="$router.push('/newsongs')"
      >
        新歌推荐
      </van-button>
    </div>
    <div class="plate-list-con" :style="{opacity}">
      <div class="images-con" v-show="type==='plate'">
        <img-card
          v-for="(item, index) in dishList"
          :key="index"
          :imgUrl="item.picUrl"
          :dec="item.name"
          @click.native="$router.push(`/showsong?dishId=${item.id}`)"
        />
      </div>
      <div class="images-con" v-show="type==='newSong'">
        <img-card
          v-for="(item, index) in newSongsList"
          :key="index"
          :imgUrl="item.album.blurPicUrl"
          :dec="item.name"
          :newPlatetype="type"
          @click.native="$store.dispatch('addToAudioList', item)"
          @loadingImg="loadingImg"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ImgCard from 'components/ImgCard'
import { newDish, newSongs } from 'api/apis'
import { getRandomNumberArray } from 'utils/randomNumberArray'
export default {
  name: 'NewPlate',
  data () {
    return {
      dishList: [],
      newSongsList: [],
      type: 'plate',
      opacity: 0,
      total: 0 // 新碟总数
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
          this.total = data.total
        })
        .catch(() => {
          this.$toast('加载新碟,请稍后尝试')
        })
    },
    getNewSongs () {
      newSongs()
        .then(data => {
          this.newSongsList = getRandomNumberArray(data.data, 3)
        })
        .catch(() => {
          this.$toast('加载新歌,请稍后尝试')
        })
    },
    loadingImg (data) {
      this.$nextTick(() => {
        this.opacity = data ? 1 : 0
      })
    }
  },
  components: {
    ImgCard
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
    .header {
      display: flex;
      align-items: flex-end;
      span {
        display: flex;
        align-items: flex-end;
        color: rgba(0, 0, 0, .4);
        font-size: 4.2vw;
      }
      .title {
        width: 12vw;
        height: .36rem;
        box-sizing: border-box;
        border-right: 1px solid rgba(0, 0, 0, .2);
      }
      .title2 {
        margin-left: 2vw;
      }
      .active {
        font-size: 5.2vw;
        font-weight: 900;
        color: rgba(0, 0, 0, .9);
      }
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
