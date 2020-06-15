<template>
  <div class="container">
    <van-collapse class="song-list-con" v-model="activeNames" :border="false">
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
          <!-- 没登录的情况下列表项显示 -->
          <ul class="song-group" v-if="!$store.state.loginState">
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
          </ul>
          <!-- 登录的情况下列表项显示 -->
          <ul class="song-group" v-if="$store.state.loginState">
            <!-- 我喜欢的音乐 -->
            <song-list-li
              v-for="(item, index) in myLoveList" :key="index"
              :coverImgUrl="item.coverImgUrl"
              :name="item.name"
              :trackCount="item.trackCount"
              :privacy="item.privacy"
              :myLove="true"
              :home="true"
            >
            </song-list-li>
            <!-- 由于我喜欢的音乐占了一个,索引+1 -->
            <song-list-li
              v-for="(item, index) in createList" :key="index+1"
              :coverImgUrl="item.coverImgUrl"
              :name="item.name"
              :trackCount="item.trackCount"
              :privacy="item.privacy"
              :home="true"
            >
            </song-list-li>
          </ul>
        </template>
      </van-collapse-item>
      <!-- 收藏的歌单 -->
      <!-- 有收藏的情况下才显示 -->
      <van-collapse-item
        v-if="favoritesList > 0"
        name="favorites"
        :border="false"
        class="song-list-item"
        :is-link="false"
      >
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
            <song-list-li
              v-for="(item, index) in favoritesList" :key="index"
              :coverImgUrl="item.coverImgUrl"
              :name="item.name"
              :trackCount="item.trackCount"
              :creatorNickname="item.creator.nickname"
              :privacy="item.privacy"
              :home="true"
            >
            </song-list-li>
          </ul>
        </template>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>
<script>
import { playlist } from 'api/apis'
import SongListLi from 'components/SongListLi'
import { mapGetters } from 'vuex'
import 'utils/imgLazy'
export default {
  name: 'HomeSongList',
  inject: ['reload'],
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
  computed: {
    ...mapGetters(['accountUid'])
  },
  watch: {
    // 当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行
    // 需要在最初绑定值的时候也执行函数，则就需要用到immediate属性
    // 监听数组的变化 深度监视deep
    index: {
      deep: true,
      handler (val, oldVal) {
        this.createIndex = val.createNum
        this.favoritesIndex = val.favoritesNum
        this.getPlaylist(this.accountUid)
      },
      immediate: true
    }
  },
  methods: {
    getPlaylist (id) {
      playlist(id)
        .then(data => {
          this.sliceInfo(data.playlist)
          // 刷新
          this.reload()
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    sliceInfo (arr) {
      const from = this.createIndex
      const len = this.createIndex + this.favoritesIndex
      const SongListCreate = arr.slice(0, from)
      this.myLoveList = SongListCreate.slice(0, 1)
      this.createList = SongListCreate.slice(1)
      this.favoritesList = arr.slice(from, len)
    }
  },
  components: {
    SongListLi
  }
}
</script>
<style lang='scss' scoped>
.container {
  display: flex;
  .song-list-con {
    display: flex;
    flex-direction: column;
    width: 100%;
    // 歌单
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
    }
  }
}
</style>
