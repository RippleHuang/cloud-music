<template>
  <div class="nav-con">
    <div class="mask" v-show="isFixedSong" :style="{ height }"></div>
    <div class="mask1" v-if="imgUrl" :style="{ background: `url(${imgUrl}) center` }"></div>
    <div class="default-nav" :style="{ background, height }">
      <div class="left">
        <i class="iconfont icon-zuo" @click="rollback"></i>
        <!-- 播放页 -->
        <div class="play" v-if="playName">
          <span class="play-title">{{playName}}</span>
          <p class="all-nickname van-ellipsis">
            <span class="nickname" v-for="(item, index) in artist" :key="index">
              {{item.name}}
            </span>
            <i class="iconfont icon-arrow-right"></i>
          </p>
        </div>
        <!-- 歌单 -->
        <div class="song-show-nav" v-if="songList">
          <span class="title" :class="{animation: isFixedTitle}">{{title}}</span>
        </div>
        <!-- 默认 -->
        <span v-if="defaultShow">{{title}}</span>
        <!-- 用户信息页 -->
        <span v-show="isFixed">{{title}}</span>
      </div>
      <!-- 歌单 -->
      <span class="icons" v-if="songList" @click="no">
        <i class="iconfont icon-sousuo"></i>
        <i class="iconfont icon-sandian"></i>
      </span>
      <!-- 分享 -->
      <i v-if="share" @click="showShare = true" class="iconfont icon-fenxiang"></i>
    </div>
    <van-share-sheet
      v-model="showShare"
      title="分享"
      :options="options"
    />
  </div>
</template>
<script>
export default {
  name: 'DefaultNav',
  props: {
    title: {
      type: String
    },
    defaultShow: {
      type: Boolean
    },
    background: {
      type: String
    },
    share: {
      type: Boolean
    },
    isFixed: {
      type: Boolean
    },
    height: {
      type: String
    },
    playName: {
      type: String
    },
    artist: {
      type: Array
    },
    songList: {
      type: Boolean
    },
    isFixedTitle: {
      type: Boolean
    },
    imgUrl: {
      type: String
    },
    isFixedSong: {
      type: Boolean
    }
  },
  data () {
    return {
      showShare: false,
      options: [
        [
          { name: '复制链接', icon: 'link' },
          { name: '二维码', icon: 'qrcode' }
        ],
        [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ]
      ]
    }
  },
  methods: {
    rollback () {
      // 转化为迷你播放器
      if (this.playName) {
        this.$store.commit('SET_FULL_SCREEN', false)
      } else {
        this.$router.go(-1)
      }
    },
    no () {
      this.$toast('该功能尚未实装,敬请期待')
    }
  }
}
</script>
<style lang='scss' scoped>
.nav-con {
  position: relative;
  width: 100%;
  height: 0;
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 4;
    width: 100%;
    height: 1.6rem;
    background-color: rgb(148, 142, 142);
    &::after {
      content: '.';
      opacity: 0;
    }
  }
  .mask1 {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 4;
    width: 100%;
    height: 1.6rem;
    -webkit-filter: blur(15px);
    filter: blur(15px);
    &::after {
      content: '.';
      opacity: 0;
    }
  }
  .default-nav {
    position: fixed;
    top: 0;
    z-index: 5;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 1.2rem;
    padding: 0 .2rem;
    box-sizing: border-box;
    line-height: 1.2rem;
    color: #fff;
    font-size: .42rem;
    .left {
      i {
        display: inline-block;
        height: 1.2rem;
        padding-right: .4rem;
        font-size: .42rem;
      }
      .play {
        position: absolute;
        left: .9rem;
        top: .23rem;
        display: flex;
        flex-direction: column;
        width: 75%;
        line-height: 1.3;
        overflow: hidden;
        .play-title {
          width: 100%;
          font-size: .34rem;
          white-space: nowrap;
          animation: 15s wordsLoop linear infinite normal;
        }
        .all-nickname {
          width: 100%;
          height: .3rem;
          line-height: .5;
          .nickname {
            font-size: .22rem;
            color: rgb(192, 190, 190);
            &::before {
              content: "/";
              font-size: .2rem;
            }
            &:first-of-type::before {
              content: "";
            }
          }
          .icon-arrow-right {
            height: .3rem;
            padding: 0;
            margin-left: -0.05rem;
            font-size: .2rem;
            line-height: .3rem;
            text-align: center;
            color: rgb(187, 182, 182);
          }
        }
      }
      span {
        font-size: .36rem;
      }
      .song-show-nav {
        @extend .play;
        top: .38rem;
        width: 65%;
        .title {
          width: 100%;
          font-size: .34rem;
          white-space: nowrap;
        }
      }
    }
    .icons {
      display: flex;
      justify-content: space-between;
      width: 1.2rem;
      i {
        font-size: .42rem;
      }
    }
    .icon-fenxiang {
      font-size: .42rem;
    }
  }
}
.animation {
  animation: 15s wordsLoop linear infinite normal;
}
// 循环滚动
@keyframes wordsLoop {
  0% {
    transform: translateX(75vw);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
