<template>
  <div class="container">
    <van-collapse class="song-created" v-model="activeNames" :border="false">
      <van-collapse-item name="1" :border="false" class="song-created-item" :is-link="false">
        <!-- 左边标题 -->
        <template #title>
          <div class="left-title">
            <i v-show="!activeNames.length" class="iconfont icon-arrow-right"></i>
            <i v-show="activeNames.length" class="iconfont icon-arrow-down"></i>
            <span class="title">创建的歌单</span>
            <span class="num">(1)</span>
          </div>
        </template>
        <!-- 右边按钮图标 -->
        <template #right-icon>
          <!-- 阻止冒泡 -->
          <div class="right-icons" @click.stop>
            <i class="iconfont icon-jia1 on-touch"></i>
            <i class="iconfont icon-sandian on-touch"></i>
          </div>
        </template>
        <!-- 歌单列表 -->
        <template #default>
          <ul class="song-group">
            <!-- 没登录的情况下列表项显示 -->
            <li class="song-list">
              <div class="left">
                <div class="list-cover">
                  <div class="bgc">
                    <i class="iconfont icon-xindong2"></i>
                  </div>
                </div>
                <div class="list-info">
                  <p class="list-title">我喜欢的音乐</p>
                  <p class="list-num">0首</p>
                </div>
              </div>
              <div class="heart-module">
                <van-button class="title-btn" round type="info" @click.stop>
                  <i class="iconfont icon-xindong"></i>心动模式
                </van-button>
              </div>
            </li>
            <!-- 登录的情况下列表项显示 -->
            <li class="song-list" v-for="(item, index) in createList" :key="index">
              <div class="left">
                <div class="list-cover">
                  <div class="bgc">
                    <img :src="item.coverImgUrl + '?param=100y100'" />
                  </div>
                </div>
                <div class="list-info">
                  <p class="list-title">{{item.name}}</p>
                  <p class="list-num">{{item.trackCount}}首</p>
                </div>
              </div>
              <div class="heart-module">
                <van-button class="title-btn" round type="info" @click.stop>
                  <i class="iconfont icon-xindong"></i>心动模式
                </van-button>
              </div>
            </li>
          </ul>
        </template>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
import { playlist } from '@/api/apis'
export default {
  name: 'HomeSongList',
  props: ['index'],
  data () {
    return {
      activeNames: ['1'],
      // 收藏歌单详情
      favoritesList: [],
      // 创建歌单详情
      createList: [],
      // 我的喜欢歌单
      myLoveList: []
    }
  },
  mounted () {
    this.favoritesIndex = this.index.favoritesNum
    this.createIndex = this.index.createNum
    this.getPlaylist(117966748)
  },
  watch: {
    index: {
      deep: true,
      handler (val, oldVal) {
        this.createIndex = val.createNum
        this.favoritesIndex = val.favoritesNum
        this.getPlaylist(117966748)
      }
    }
  },
  methods: {
    getPlaylist (id) {
      // 时间戳
      const date = +new Date()
      playlist(id, date).then(data => {
        this.sliceInfo(data.playlist)
      })
    },
    sliceInfo (arr) {
      const from = this.createIndex
      const len = this.createIndex + this.favoritesIndex
      this.createList = arr.slice(0, from)
      this.myLoveList = this.createList.slice(0, 1)
      this.createList = this.createList.slice(1)
      this.favoritesList = arr.slice(from, len)
    }
  }
}
</script>
<style lang='scss' scoped>
.container {
  display: flex;
  .song-created {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    // 创建歌单
    .song-created-item {
      display: flex;
      flex-direction: column;
      width: 100%;
      // 标题及右图标
      .left-title {
        display: flex;
        align-items: center;
        height: .9rem;
        i {
          flex: .16;
          height: .9rem;
          line-height: .9rem;
          font-size: .48rem;
          text-align: center;
        }
        .title {
          font-size: .33rem;
          font-weight: bold;
        }
        .num {
          margin-left: .1rem;
          font-size: .28rem;
          color: rgba(0, 0, 0, .4);
        }
      }
      .right-icons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: .25;
        height: .9rem;
        padding-right: .2rem;
        i {
          flex: 1;
          height: .9rem;
          line-height: .9rem;
          text-align: center;
          font-size: .33rem;
        }
      }
      // 创建歌单列表
      .song-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .song-list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 1.2rem;
          .left {
            display: flex;
            align-items: center;
            flex: 3.2;
            // 左侧图像
            .list-cover {
              padding: .1rem .225rem .1rem;
              .bgc {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 1rem;
                height: 1rem;
                background: rgba(0, 0, 0, 0.8);
                border-radius: .1rem;
              }
              i {
                color: #fff;
                font-size: .5rem;
              }
            }
            // 歌单信息
            .list-info {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              flex: 3;
              height: 1rem;
              padding: .1rem 0;
              .list-title {
                font-size: .28rem;
                color: #3d3d3d;
              }
              .list-num {
                font-size: .25rem;
              }
            }
          }
          // 心动按钮
          .heart-module {
            display: flex;
            align-items: center;
            flex: 1;
            height: 1.2rem;
            padding-right: .225rem;
            font-size: .24rem;
            .title-btn {
              width: 1.6rem;
              height: .5rem;
              line-height: .5rem;
              padding: 0 .1rem;
              font-size: .23rem;
              color: #3d3d3d;
              background-color: #fff;
              border: .01rem solid rgba(0, 0, 0, .1);
              i {
                font-size: .24rem;
                margin-right: .05rem;
              }
              &:active {
                border: none;
              }
            }
          }
          // 通过兄弟选择器来使整个容器active
          .left:active, .left:active ~* {
            background: rgba(1, 1, 1, .1);
            .title-btn {
              background: transparent;
            }
          }
        }
      }
    }
  }
}
</style>
