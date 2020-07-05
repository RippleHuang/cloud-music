<template>
  <div class="public-sticky">
    <!-- 歌单列表 -->
    <div class="sticky-box" :style="{top}" v-if="show">
      <loading :height="4.35" isabsolute v-show="loading" />
      <div class="content-sticky" v-show="!loading">
        <!-- 顶部粘性布局 -->
        <div class="sticky-top" :style="{top:stickyTop}" @click="startPlay">
          <span>
            <!-- 新音乐与每日推荐 -->
            <i class="iconfont icon-bofang1" :style="{padding:newAndrecommed}"></i>
            播放全部
          </span>
          <span v-if="trackCount" class="trackCount">(共{{trackCount}}首)</span>
        </div>
        <!-- 为迷你播放器留空 -->
        <ul
          class="song-group"
          :style="{'padding-bottom': $store.state.audioList.length ? '1rem' : 0 }"
        >
          <!-- 瀑布流加载 -->
          <van-list
            v-model="reload"
            :finished="finish"
            :finished-text="trackCount >= 800 ? '上限为800' : '没有更多了'"
            :offset="50"
            @load="reLoad"
          >
            <div class="listOne" v-if="!newSong">
              <song-list-li
                v-for="(item, index) in songList" :key="index"
                songShow
                :number="recommend ? 0 : index+1"
                :coverImgUrl="recommend ? item.al.picUrl : ''"
                :active="item.id === audioIngSong.id"
                :artists="item.ar"
                :albumName="item.al.name"
                :name="item.name"
                :privacy="0"
                home
                @playSong="setAudioList(index)"
              />
            </div>
            <!-- 新歌 -->
            <div class="listTwo" v-if="newSong">
              <song-list-li
                v-for="(item, index) in songList" :key="index"
                songShow
                :coverImgUrl="item.album.picUrl"
                :active="item.id === audioIngSong.id"
                :artists="item.artists"
                :albumName="item.album.name"
                :name="item.name"
                :privacy="0"
                home
                @playSong="setAudioList(index)"
              />
            </div>
          </van-list>
        </ul>
      </div>
    </div>
    <!-- 歌曲为空 -->
    <div class="empty" v-if="!show">
      <button class="add-button">添加歌曲</button>
    </div>
  </div>
</template>
<script>
import Loading from 'components/Loading'
import SongListLi from 'components/SongListLi'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PubcliSticky',
  props: {
    show: {
      type: Boolean
    },
    loading: {
      type: Boolean
    },
    trackCount: {
      type: Number
    },
    songList: {
      type: Array
    },
    songListAll: {
      type: Array
    },
    recommend: {
      type: Boolean
    },
    top: {
      type: String,
      default: '5.9rem'
    },
    newSong: {
      type: Boolean
    },
    load: {
      type: Boolean
    },
    finish: {
      type: Boolean
    },
    stickyTop: {
      type: String
    },
    newAndrecommed: {
      type: String
    }
  },
  data () {
    return {
      reload: false
    }
  },
  computed: {
    ...mapGetters(['audioIngSong'])
  },
  methods: {
    ...mapActions(['selectPlay', 'startPlayAll']),
    setAudioList (index) {
      this.selectPlay({ list: this.songListAll, index })
    },
    startPlay () {
      this.startPlayAll({ list: this.songListAll })
    },
    reLoad () {
      this.$nextTick(() => {
        this.reload = this.load
      })
      this.$emit('reLoad')
    }
  },
  components: {
    Loading,
    SongListLi
  }
}
</script>
<style lang='scss' scoped>
.sticky-box {
  position: absolute;
  top: 5.9rem;
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
    &:active {
      background-color: rgb(233, 230, 230);
    }
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
.empty {
  position: absolute;
  top: 5.9rem;
  width: 100%;
  padding-top: 2rem;
  text-align: center;
  border-radius: 0.4rem 0.4rem 0 0;
  background-color: #fff;
  .add-button {
    width: 50vw;
    height: .8rem;
    color: #dd001b;
    background-color: transparent;
    border: 0.01rem solid #dd001b;
    border-radius: 0.4rem;
    &:active {
      color: #fff;
      background-color: #dd001b;
      border: none;
    }
  }
}
</style>
