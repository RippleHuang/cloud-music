<template>
  <li class="song-list">
    <div class="left">
      <!-- 歌单 -->
      <div class="list-cover" v-if="!songShow">
        <img v-lazy="coverImgUrl" alt="" />
        <div v-if="privacy !== 0" class="mask"></div>
        <i :style="{ bottom: `${bottom}rem` }" class="iconfont icon-icon-system-fn-lock" v-if="privacy !== 0"></i>
      </div>
      <!-- 歌曲 -->
      <div class="list-cover" style="width: 0.5rem; text-align: center;" v-if="songShow">
        <span v-if="!active" class="number">{{number}}</span>
        <i v-else class="iconfont icon-yinliang"></i>
      </div>
      <!-- 歌单 -->
      <div class="list-info" v-if="!songShow">
        <!-- 默认会显示用户姓名,需要替换 我喜欢的音乐样式调整 -->
        <p class="list-title van-ellipsis" :class="{ first:myLove }">{{myLove?'我喜欢的音乐':name}}</p>
        <p class="list-num van-ellipsis">
          <!-- 专辑 -->
          <span class="artist" v-for="(item, index) in artists" :key="index">{{item.name}}</span>
          {{trackCount}}首
          <span v-if="creatorNickname">，by {{creatorNickname}}</span>
          <span v-if="playCount === 0">，播放0次</span>
          <span v-if="playCount">，播放{{playCount | filterPlayCountInfo }}次</span>
        </p>
      </div>
      <!-- 歌曲 -->
      <div class="list-info" @click="playSong" v-if="songShow">
        <!-- 不添加 v-if 会影响其他 -->
        <p class="list-title van-ellipsis"
          :style="{padding: '0.2rem 0 0.03rem', width: songplayCount ? '65vw' : '75vw'}"
          v-if="songShow"
        >
        {{name}}
        </p>
        <p class="list-num van-ellipsis" :style="{width: songplayCount ? '65vw' : '75vw'}" v-if="songShow">
          <span class="artist" v-for="(item, index) in artists" :key="index">{{ item.name }}</span>
          <span class="album-name">{{ albumName }}</span>
        </p>
      </div>
    </div>
    <div class="compile" v-if="home" :style="{flex: songplayCount ? 0.8 : 0.32 }">
      <van-button v-if="myLove" class="title-btn" round type="info" @click.stop="heartMode">
        <i class="iconfont icon-xindong"></i>心动模式
      </van-button>
      <span v-else-if="songplayCount">
        <i class="iconfont icon-bofang1"></i>{{songplayCount}}次
      </span>
      <i v-else-if="showActionSheet" class="iconfont icon-sandian on-touch" @click.stop="showAction"></i>
      <i v-else class="iconfont icon-sandian on-touch"  @click.stop="no"></i>
    </div>
  </li>
</template>
<script>
import { filterPlayCountInfo } from 'utils/filters'
import { albumDetail } from 'api/apis'
export default {
  name: 'SongListLi',
  props: {
    coverImgUrl: {
      type: String
    },
    name: {
      type: String
    },
    trackCount: {
      type: Number
    },
    creatorNickname: {
      type: String
    },
    showActionSheet: {
      type: Boolean
    },
    description: {
      type: String
    },
    noCompile: {
      type: Boolean,
      default: false
    },
    // 隐秘歌单
    privacy: {
      type: Number
    },
    myLove: {
      type: Boolean
    },
    home: {
      type: Boolean
    },
    playCount: {
      type: Number
    },
    bottom: {
      type: Number
    },
    // 歌单id
    id: {
      type: Number
    },
    // 歌曲
    songShow: {
      type: Boolean
    },
    number: {
      type: Number
    },
    songplayCount: {
      type: Number
    },
    active: {
      type: Boolean
    },
    artists: {
      type: Array
    },
    albumName: {
      type: String
    }
  },
  methods: {
    // 返回一个随机数
    randomNum (min, max) {
      return parseInt(Math.random() * (max - min + 1) + min, 10)
    },
    heartMode () {
      albumDetail(this.id)
        .then(data => {
          const arr = data.playlist.trackIds
          const index = this.randomNum(0, arr.length)
          const item = arr[index]
          this.$emit('getHeartMode', item.id, this.id)
        })
        .catch(() => {
          this.$toast('获取失败')
        })
    },
    playSong () {
      this.$emit('playSong')
    },
    showAction () {
      this.$emit('showAction', {
        id: this.id,
        name: this.name,
        description: this.description,
        noCompile: this.noCompile
      })
    },
    no () {
      this.$toast('该功能尚未实装,敬请期待')
    }
  },
  filters: {
    filterPlayCountInfo
  }
}
</script>
<style lang='scss' scoped>
// 左侧图像
.list-cover {
  position: relative;
  img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    background: rgba(0, 0, 0, 0.8);
    border-radius: .1rem;
  }
  .icon-icon-system-fn-lock {
    position: absolute;
    right: .26rem;
    bottom: .23rem;
    color: #fff;
    width: .25rem;
    height: .25rem;
    font-size: .3rem;
  }
  .mask {
    position: absolute;
    right: .225rem;
    bottom: .1rem;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 .5rem .5rem;
    border-color: transparent transparent rgba(0, 0, 0, .6) transparent;
  }
  // 歌曲
  .number {
    font-size: .32rem;
    color: rgb(124, 123, 123);
  }
  .icon-yinliang {
    color: #dd001b;
    font-size: .36rem;
  }
}
.list-num {
  padding-bottom: .04rem;
}
// 歌曲
.list-info {
  font-size: 0.23rem;
  color: #a19d9d;
  .list-title {
    color: black;
    font-size: .28rem;
  }
  .artist {
    display: inline-block;
    height: .4rem;
    line-height: .4rem;
    font-size: .21rem;
    &::before {
      content: "/";
      font-size: .2rem;
      padding: 0 .04rem;
    }
    &:first-of-type::before {
      content: "";
      padding: 0;
    }
  }
  .album-name {
    font-size: .21rem;
    &::before {
      content: "-";
      padding: 0 .04rem;
    }
  }
}
// 心动按钮
.compile {
  font-size: .24rem;
  .title-btn {
    width: 1.75rem;
    height: .5rem;
    line-height: .5rem;
    padding: 0 .1rem;
    font-size: 3vw;
    color: black;
    background-color: #fff;
    border: .01rem solid rgba(0, 0, 0, .1);
    .icon-xindong {
      font-size: .24rem;
      margin-right: .05rem;
    }
    &:active {
      border: none;
    }
  }
  .icon-sandian {
    color: #a19d9d;
  }
  span {
    color: rgb(141, 138, 138);
    i {
      margin-right: .1rem;
      font-size: .24rem;
    }
  }
}
</style>
