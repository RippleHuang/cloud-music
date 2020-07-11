<template>
  <div class="show-song">
    <DefaultNav
      :title="opacity < 0.5 ? data.name : title"
      :background="'transparent'"
      :imgUrl="imgUrl"
      :isFixedTitle="opacity < 0.5"
      :height="opacity < 0.05 ? '1.6rem' : '1.2rem'"
      isFixedSong
      songList
    />
    <div class="mask" :style="{ background: `url(${imgUrl}) center` }"></div>
    <div class="body" :style="{opacity}">
      <div class="container" @click="showPreview = true">
        <div class="left">
          <img-card
            :imgUrl="imgUrl"
            :playCount="albumInfo.playCount"
            :albumId="albumId"
            :width="'100%'"
          />
        </div>
        <div class="right">
          <span class="song-list-title van-multi-ellipsis--l2" v-show="!loading">{{data.name}}</span>
          <!-- 去用户信息页 -->
          <div class="info van-ellipsis" v-show="!loading" @click.stop="goUserInfo">
            <img v-if="avatarUrl" :src="avatarUrl + '?param=50y50'" alt="">
            <span>{{nickname}} <i class="iconfont icon-arrow-right"></i></span>
          </div>
          <p class="song-list-info" v-show="!loading">
            <span class="van-multi-ellipsis--l2"
              v-if="uid === accountUid"
              @click.stop="goCompile"
            >
            {{data.description ? data.description : '编辑信息'}}
            </span>
            <span class="van-multi-ellipsis--l2" v-else>
              {{data.description ? data.description : '暂无描述'}}
            </span>
            <i class="iconfont icon-arrow-right"></i>
          </p>
        </div>
      </div>
      <div class="bottom">
        <div class="icon-fc">
          <i class="iconfont icon-xinxi" @click="no"></i>
          <span>{{commentCount ? commentCount : '评论'}}</span>
        </div>
        <div class="icon-fc">
          <i class="iconfont icon-fenxiang" @click="no"></i>
          <span>{{shareCount ? shareCount : '分享'}}</span>
        </div>
        <div class="icon-fc">
          <i class="iconfont icon-xiazai" @click="no"></i>
          <span>下载</span>
        </div>
        <div class="icon-fc">
          <i class="iconfont icon-duoxuan" @click="no"></i>
          <span>多选</span>
        </div>
      </div>
    </div>
    <pubcli-sticky
      :show="show"
      :loading="loading"
      :trackCount="trackCount"
      :songList="songList"
      :songListAll="songListAll"
      :load="load"
      :finish="finish"
      :albumId="albumId"
      :dishId="dishId"
      :subNumber="subNumber"
      :uid="uid"
      @reLoad="onLoad"
    />
    <!-- 预览图片 -->
    <van-image-preview v-model="showPreview" :images="[imgUrl]" closeable class-name="show-preview">
      <template #cover>
        <div class="preview-con">
          <p class="preview-title">{{data.name}}</p>
          <p class="preview-tag" v-if="albumInfo.tags">
            标签:
            <span v-if="albumInfo.tags.length === 0">无</span>
            <span v-for="(item, index) in albumInfo.tags" :key="index"> {{item}}</span>
          </p>
          <p class="preview-dec">{{data.description}}</p>
        </div>
      </template>
    </van-image-preview>
  </div>
</template>
<script>
import DefaultNav from 'components/DefaultNav'
import ImgCard from 'components/ImgCard'
import PubcliSticky from 'components/PubcliSticky'
import { albumDetail, playlistDetail, songInfo } from 'api/apis'
import { mapGetters } from 'vuex'
import { listRefresh, scroll } from '@/mixins/mixins'
export default {
  name: 'ShowSong',
  mixins: [listRefresh, scroll],
  data () {
    return {
      // 歌单相关
      albumInfo: [],
      data: {
        name: '',
        description: ''
      },
      nickname: '',
      imgUrl: '',
      avatarUrl: '',
      commentCount: 0,
      shareCount: 0,
      trackCount: 0,
      title: '',
      // 歌单专辑id
      albumId: 0,
      dishId: 0,
      // 收藏数
      subNumber: 0,
      // 歌单用户id
      uid: 0,
      show: true,
      // 图片预览
      showPreview: false
    }
  },
  activated () {
    window.scrollTo(0, 0)
    // 进来前清空
    this.albumId = 0
    this.dishId = 0
    this.show = true
    const albumId = this.$route.query.albumId
    if (albumId) {
      this.albumId = JSON.parse(albumId)
      this.title = '歌单'
      this.getSongListInfo(this.albumId)
    } else {
      this.dishId = JSON.parse(this.$route.query.dishId)
      this.title = '专辑'
      this.getDishInfo(this.dishId)
    }
    this.loading = true
    this.opacity = 1
  },
  computed: {
    ...mapGetters(['accountUid'])
  },
  methods: {
    // 歌单
    getSongListInfo (id) {
      playlistDetail(id)
        .then(data => {
          this.albumInfo = data.playlist
          this.subNumber = data.playlist.subscribedCount
          const length = data.playlist.trackIds.length
          this.initData(data.playlist, length)
          if (length) {
            // tracks 中的歌是不完整的,最多20个,需要通过trackIds中的id获取单个歌曲详情
            const arr = []
            data.playlist.trackIds.forEach((val, index) => {
              arr[index] = val.id
            })
            // 歌曲超过一定数量接口会请求失败,这里设置上限为800
            if (arr.length >= 800) {
              this.getSongInfo(arr.slice(0, 800).join())
            } else {
              this.getSongInfo(arr.join())
            }
          } else {
            this.loading = false
            this.show = false
          }
        })
        .catch(() => {
          this.$toast('获取歌单信息失败')
        })
    },
    // 获取专辑内容
    getDishInfo (id) {
      albumDetail(id)
        .then(data => {
          this.albumInfo = data
          this.songListAll = data.songs
          // 当有歌曲才获取数据
          const length = data.songs.length
          this.initData(data.album, length)
          if (length) {
            this.division()
          } else {
            this.loading = false
            this.show = false
          }
        })
        .catch(() => {
          this.$toast('获取专辑信息失败')
        })
    },
    initData (albumInfo, length) {
      this.data.name = albumInfo.name
      this.data.description = albumInfo.description
      this.nickname = albumInfo.creator ? albumInfo.creator.nickname : albumInfo.artist.name
      this.imgUrl = albumInfo.coverImgUrl ? albumInfo.coverImgUrl : albumInfo.picUrl
      this.avatarUrl = albumInfo.creator ? albumInfo.creator.avatarUrl : albumInfo.artist.picUrl
      // 当有歌曲才获取这些数据数据
      if (length) {
        this.uid = albumInfo.creator ? albumInfo.creator.userId : albumInfo.artist.id
        this.commentCount = albumInfo.info ? albumInfo.info.commentCount : albumInfo.commentCount
        this.shareCount = albumInfo.info ? albumInfo.info.shareCount : albumInfo.shareCount
        this.trackCount = 'trackCount' in albumInfo ? albumInfo.trackCount : albumInfo.size
      }
    },
    getSongInfo (ids) {
      // ids 支持多个参数,逗号分开
      songInfo(ids)
        .then(data => {
          this.songListAll = data.songs
          this.division()
        })
        .catch(() => {
          this.$toast('获取歌曲失败')
        })
    },
    goUserInfo () {
      if (this.albumInfo.creator && this.$store.state.loginState) {
        this.$router.push('/userInfo?accountUid=' + this.uid)
      } else if (!this.$store.state.loginState) {
        this.$toast('需要登录')
      } else {
        this.$toast('暂不支持歌手信息页')
      }
    },
    // 编辑或预览
    goCompile () {
      // 为空编辑
      if (this.data.description) {
        this.showPreview = true
      } else {
        this.$router.push({
          name: 'compilesonglist',
          params: {
            id: this.albumId,
            title: this.data.name,
            description: this.data.description ? this.data.description : ''
          }
        })
      }
    },
    no () {
      this.$toast('该功能尚未实装,预览,用户信息页,修改歌单可用')
    }
  },
  components: {
    DefaultNav,
    ImgCard,
    PubcliSticky
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
        width: 38vw;
        height: 38vw;
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 50vw;
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
          height: .7rem;
          line-height: .7rem;
          &:active {
            background-color: rgb(202, 201, 201, .5);
          }
          img {
            width: .5rem;
            height: .5rem;
            border-radius: 50%;
          }
          span {
            margin-left: .1rem;
            font-size: .28rem;
            color: #eee;
          }
        }
        .song-list-info {
          display: flex;
          align-items: center;
          span {
            font-size: .21rem;
            line-height: 1.3;
            color: #ddd;
          }
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-around;
      padding: .35rem 0 .95rem;
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
  .show-preview {
    .preview-con {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      padding: 0 .5rem;
      box-sizing: border-box;
      .preview-title {
        color: #fff;
        font-size: .36rem;
        text-align: center;
      }
      .preview-tag {
        margin-top: .5rem;
        color: #ccc;
        span {
          display: inline-block;
          margin-left: .2rem;
          padding: .1rem .2rem;
          font-size: .24rem;
          background-color: rgb(231, 224, 224, .2);
          border-radius: .2rem;
        }
      }
      .preview-dec {
        height: 2.8rem;
        margin-top: .4rem;
        line-height: 1.5;
        color: #aaa;
        overflow: scroll;
      }
    }
  }
}
</style>
