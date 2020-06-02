<template>
  <div class="container">
    <van-collapse class="song-list" v-model="activeNames" :border="false">
      <!-- 创建的歌单 -->
      <van-collapse-item name="create" :border="false" class="song-list-item" :is-link="false">
        <!-- 左边标题 -->
        <template #title>
          <div class="left-title">
            <i v-show="activeNames.indexOf('create') === -1" class="iconfont icon-arrow-right"></i>
            <i v-show="activeNames.indexOf('create') !== -1" class="iconfont icon-arrow-down"></i>
            <span class="title">创建的歌单</span>
            <span class="num">({{index.createNum}})</span>
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
                  <p class="list-title first">我喜欢的音乐</p>
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
                  <img v-lazy="item.coverImgUrl" alt="" />
                </div>
                <div class="list-info">
                  <!-- van-ellipsis 显示一行多余点点点省略 vant的内置样式 -->
                  <p class="list-title van-ellipsis">{{item.name}}</p>
                  <p class="list-num">{{item.trackCount}}首</p>
                </div>
              </div>
              <div class="compile">
                <i class="iconfont icon-sandian on-touch"></i>
              </div>
            </li>
          </ul>
        </template>
      </van-collapse-item>
      <!-- 收藏的歌单 -->
      <!-- 登录的情况下才显示 -->
      <van-collapse-item name="favorites" :border="false" class="song-list-item" :is-link="false">
        <!-- 左边标题 -->
        <template #title>
          <div class="left-title">
            <i v-show="activeNames.indexOf('favorites') === -1" class="iconfont icon-arrow-right"></i>
            <i v-show="activeNames.indexOf('favorites') !== -1" class="iconfont icon-arrow-down"></i>
            <span class="title">收藏的歌单</span>
            <span class="num">({{index.favoritesNum}})</span>
          </div>
        </template>
        <!-- 右边按钮图标 -->
        <template #right-icon>
          <!-- 阻止冒泡 -->
          <div class="right-icon" @click.stop>
            <i class="iconfont icon-sandian on-touch"></i>
          </div>
        </template>
        <!-- 歌单列表 -->
        <template #default>
          <ul class="song-group">
            <li class="song-list" v-for="(item, index) in favoritesList" :key="index">
              <div class="left">
                <div class="list-cover">
                  <img v-lazy="item.coverImgUrl" alt="" />
                </div>
                <div class="list-info">
                  <p class="list-title van-ellipsis">{{item.name}}</p>
                  <p class="list-num">
                    {{item.trackCount}}首
                    <span class="nickname">by {{item.creator.nickname}}</span>
                  </p>
                </div>
              </div>
              <div class="compile">
                <i class="iconfont icon-sandian on-touch"></i>
              </div>
            </li>
          </ul>
        </template>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
import { playlist } from 'api/apis'
import 'utils/imgLazy'
export default {
  name: 'HomeSongList',
  props: ['index'],
  data () {
    return {
      activeNames: ['create'],
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
  .song-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    // 创建歌单
    .song-list-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      // 标题及右图标
      .left-title {
        display: flex;
        align-items: center;
        height: .9rem;
        i {
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
      // 收藏歌单右侧按钮
      .right-icon {
        @extend .right-icons;
        flex: .111;
      }
      // 创建歌单列表
      .song-group {
        display: flex;
        flex-direction: column;
        width: 100%;
        .song-list {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 1.2rem;
          .left {
            display: flex;
            align-items: center;
            flex: 3.2;
            // 左侧图像
            .list-cover {
              padding: .1rem .225rem .1rem .27rem;
              .bgc {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 1rem;
                height: 1rem;
                background: rgba(0, 0, 0, 0.8);
                border-radius: .1rem;
              }
              img {
                @extend .bgc;
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
              flex: 1;
              height: 1rem;
              padding: .1rem 0;
              .list-title {
                width: 4.8rem;
                font-size: .28rem;
                color: black;
              }
              .first {
                width: 3rem;
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
              font-size: 3.4vw;
              color: black;
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
          // 歌单右侧编辑
          .compile {
            display: flex;
            justify-content: center;
            align-items: center;
            flex: .32;
            height: 1.2rem;
            padding-right: .225rem;
            i {
              display: flex;
              justify-content: center;
              align-items: center;
              flex: 1;
              height: 1.2rem;
              font-size: .33rem;
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
