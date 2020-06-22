<template>
  <div class="show-song">
    <DefaultNav
      :title="opacity < 0.5 ? name : '歌单'"
      :background="opacity < 0.5 ? `rgba(0, 0, 0, ${opacity / 3})` : `rgba(0, 0, 0, ${0.33 - opacity / 3})`"
      :imgUrl="imgUrl"
      :isFixedTitle="opacity < 0.5"
      :height="isFixed ? '1.6rem' : '1.2rem'"
      :isFixedSong="isFixed"
      songList
    />
    <div class="mask" :style="{ background: `url(${imgUrl}) center fixed` }"></div>
    <div class="body" :style="{opacity}">
      <div class="container">
        <div class="left">
          <img-card
            :imgUrl="imgUrl"
            :playCount="albumInfo.playCount"
            :albumId="albumId"
            :width="'100%'"
          />
        </div>
        <div class="right">
          <span class="song-list-title van-multi-ellipsis--l2">{{name}}</span>
          <div class="info">
            <img :src="avatarUrl" alt="">
            <span class="van-ellipsis">{{nickname}} <i class="iconfont icon-arrow-right"></i></span>
          </div>
          <p class="song-list-info">
            <span class="van-multi-ellipsis--l2">{{description}}</span>
            <i class="iconfont icon-arrow-right"></i>
          </p>
        </div>
      </div>
      <div class="bottom">
        <div class="icon-fc">
          <i class="iconfont icon-xinxi"></i>
          <span>{{commentCount ? commentCount : '评论'}}</span>
        </div>
        <div class="icon-fc">
          <i class="iconfont icon-fenxiang"></i>
          <span>{{shareCount ? shareCount : '分享'}}</span>
        </div>
        <div class="icon-fc">
          <i class="iconfont icon-xiazai"></i>
          <span>下载</span>
        </div>
        <div class="icon-fc">
          <i class="iconfont icon-duoxuan"></i>
          <span>多选</span>
        </div>
      </div>
    </div>
    <loading :height="7.58" v-show="loading" />
    <!-- 歌单列表 -->
    <div class="sticky-box" v-show="!loading">
      <!-- 顶部粘性布局 -->
      <div class="sticky-top">
        <span @click="startPlay"><i class="iconfont icon-bofang1"></i>播放全部</span>
        <span class="trackCount">(共{{trackCount}}首)</span>
      </div>
      <ul class="song-group">
        <song-list-li
          v-for="(item, index) in albumInfo.tracks || albumInfo.songs" :key="index"
          songShow
          :number="index+1"
          :active="item.id === audioIngSong.id"
          :artists="item.ar"
          :albumName="item.al.name"
          :name="item.name"
          :privacy="0"
          :home="true"
          @playSong="setAudioList(item, index)"
        />
      </ul>
    </div>
  </div>
</template>
<script>
import DefaultNav from 'components/DefaultNav'
import ImgCard from 'components/ImgCard'
import Loading from 'components/Loading'
import SongListLi from 'components/SongListLi'
import { albumDetail } from 'api/apis'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ShowSong',
  data () {
    return {
      // 歌单相关
      albumInfo: [],
      name: '',
      nickname: '',
      imgUrl: '',
      avatarUrl: '',
      description: '',
      commentCount: 0,
      shareCount: 0,
      trackCount: 0,
      albumId: 0,
      // 粘性布局
      isFixed: false,
      opacity: 1,
      // 加载
      loading: true
    }
  },
  created () {
    window.addEventListener('scroll', this.scrollHandler, true)
  },
  activated () {
    this.albumId = JSON.parse(this.$route.query.albumId)
    this.getInfo(this.albumId)
    this.loading = true
  },
  computed: {
    ...mapGetters(['audioIngSong'])
  },
  methods: {
    ...mapActions(['selectPlay', 'startPlayAll']),
    setAudioList (item, index) {
      this.selectPlay({
        list: this.albumInfo.tracks,
        index
      })
    },
    startPlay () {
      this.startPlayAll({
        list: this.albumInfo.tracks
      })
    },
    getInfo (id) {
      albumDetail(id)
        .then(data => {
          this.albumInfo = data.playlist
          const albumInfo = data.playlist
          this.name = albumInfo.name ? albumInfo.name : albumInfo.album.name
          this.nickname = albumInfo.creator.nickname ? albumInfo.creator.nickname : albumInfo.album.artist.name
          this.imgUrl = albumInfo.coverImgUrl ? albumInfo.coverImgUrl : albumInfo.album.picUrl
          this.avatarUrl = albumInfo.creator.avatarUrl ? albumInfo.creator.avatarUrl : albumInfo.album.artist.picUrl
          // 这里判断是否有该属性
          this.commentCount = 'commentCount' in albumInfo ? albumInfo.commentCount : albumInfo.album.info.commentCount
          this.shareCount = 'shareCount' in albumInfo ? albumInfo.shareCount : albumInfo.album.info.shareCount
          this.trackCount = 'trackCount' in albumInfo ? albumInfo.trackCount : albumInfo.album.size
          // 单独判断歌单简介
          if ('description' in albumInfo) {
            this.description = albumInfo.description ? albumInfo.description : '暂无简介'
          } else {
            this.description = albumInfo.album.description ? albumInfo.album.description : '暂无简介'
          }
          this.$nextTick(() => {
            this.loading = false
          })
        })
        .catch(() => {
          this.$toast('获取歌单信息失败')
        })
    },
    // 粘性时变化样式
    scrollHandler () {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var clientHeight = document.documentElement.clientHeight
      if (scrollTop / clientHeight >= 0.35) {
        this.isFixed = true
      } else {
        var opa = 1 - (3 * scrollTop / clientHeight).toFixed(2)
        this.opacity = opa >= 0 ? opa : 0
        this.isFixed = false
      }
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollHandler, true)
  },
  components: {
    DefaultNav,
    ImgCard,
    Loading,
    SongListLi
  }
}
</script>
<style lang='scss' scoped>
.show-song {
  position: relative;
  padding-top: 1.6rem;
  background: rgba(0, 0, 0, .3);
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    -webkit-filter: blur(15px);
    filter: blur(15px);
  }
  .body {
    width: 92.8%;
    margin: 0 auto;
    .container {
      display: flex;
      justify-content: space-between;
      .left {
        width: 2.6rem;
        height: 2.6rem;
        img {
          width: 2.6rem;
          height: 2.6rem;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 3.7rem;
        i {
          font-size: .28rem;
          color: #ddd;
        }
        .song-list-title {
          color: #fff;
          font-size: .33rem;
          line-height: 1.3;
        }
        .info {
          height: .5rem;
          img {
            width: .5rem;
            height: .5rem;
            border-radius: 50%;
          }
          span {
            margin-left: .1rem;
            font-size: .28rem;
            color: #ddd;
          }
        }
        .song-list-info {
          display: flex;
          align-items: center;
          span {
            font-size: .21rem;
            line-height: 1.3;
            color: #bbb;
          }
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-around;
      padding: .35rem 0;
      .icon-fc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: .8rem;
        i {
          font-size: .38rem;
          color: #fff;
        }
        span {
          font-size: .26rem;
          color: #ddd;
        }
      }
    }
  }
  .sticky-box {
    position: absolute;
    top: 5.7rem;
    width: 100%;
    border-radius: .4rem .4rem 0 0;
    background-color: #fff;
    .sticky-top {
      position: sticky;
      top: 1.2rem;
      z-index: 6;
      height: 1rem;
      line-height: 1rem;
      border-radius: .4rem .4rem 0 0;
      background-color: #fff;
      .icon-bofang1 {
        padding: 0 .3rem 0 .4rem;
        font-size: .32rem;
      }
      .trackCount {
        font-size: .26rem;
        color: rgb(151, 149, 149);
      }
    }
    .song-group {
      background-color: #fff;
    }
  }
}
</style>
