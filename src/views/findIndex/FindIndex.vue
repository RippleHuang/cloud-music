<template>
  <div class="find-box">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :head-height="120">
      <template #pulling="props">
        <div class="icon" :style="{ transform: `rotate(${props.distance * 3}deg)`}">
          <i class="iconfont icon-jiazai"></i>
        </div>
      </template>
      <!-- 释放提示 -->
      <template #loosing="props">
        <div class="icon" :style="{ transform: `rotate(${props.distance * 3}deg)`}">
          <i class="iconfont icon-jiazai"></i>
        </div>
      </template>
      <!-- 加载提示 -->
      <template #loading>
        <div class="icon">
          <svg viewBox="25 25 50 50">
            <circle cx="50" cy="50" r="20"></circle>
          </svg>
        </div>
      </template>
    </van-pull-refresh>
    <div class="container-find">
      <swiper />
      <findIcons />
      <song-list :songList="songList" />
      <new-plate />
    </div>
  </div>
</template>
<script>
import Swiper from './Swiper'
import FindIcons from './FindIcons'
import SongList from './SongList'
import NewPlate from './NewPlate'
import { recSongList, loginRecSongList } from 'api/apis'
import { getRandomNumberArray } from 'utils/randomNumberArray'
export default {
  name: 'FindIndex',
  inject: ['reload'],
  data () {
    return {
      isLoading: false,
      songList: []
    }
  },
  created () {
    this.judge()
  },
  methods: {
    // 刷新
    onRefresh () {
      this.judge()
    },
    // 判断请求什么数据
    judge () {
      if (this.$store.state.loginState) {
        this.getRecSong()
      } else {
        this.getSongList()
      }
    },
    // 未登录
    getSongList () {
      recSongList()
        .then(data => {
          this.songList = getRandomNumberArray(data.playlists, 6)
          this.$nextTick(() => {
            this.isLoading = false
            this.$toast({
              position: 'top',
              className: 'refresh-toast',
              message: '已为你推荐个性化内容'
            })
          })
        })
        .catch(() => {
          this.$toast('加载失败,请稍后尝试')
        })
    },
    // 已登录
    getRecSong () {
      loginRecSongList()
        .then(data => {
          this.songList = getRandomNumberArray(data.recommend, 6)
          this.$nextTick(() => {
            this.isLoading = false
            this.$toast({
              position: 'top',
              className: 'refresh-toast',
              message: '已为你推荐个性化内容'
            })
          })
        })
        .catch(() => {
          this.$toast('加载失败,请稍后尝试')
        })
    }
  },
  components: {
    Swiper,
    FindIcons,
    SongList,
    NewPlate
  }
}
</script>
<style lang="scss" scoped>
.find-box {
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: .8rem;
    height: .8rem;
    margin: 0 auto;
    border-radius: 50%;
    background-color: #fff;
    .icon-jiazai {
      color: #dd001b;
      font-size: .55rem;
    }
    svg {
      width: .6rem;
      transform-origin: center;
      animation: rotate 2s linear infinite;
      circle {
        fill: none;
        stroke: #dd001b;
        stroke-width: 3;
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
      }
    }
  }
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
