<template>
  <div class="play-music">
    <!-- 全屏播放器 -->
    <div class="full-screen" v-show="fullScreen">
      <div class="mask" id="mask"></div>
      <default-nav
        :height="'1.2rem'"
        :background="'transparent'"
        defaultShow
        :playName="name"
        :artist="artist"
        share
      />
      <img-cover
        class="img-bgc"
        v-show="imgCoverShow"
        :imgUrl="imgUrl"
        @click.native="imgCoverShow = !imgCoverShow"
      />
      <!-- 歌词 -->
      <lyric
        :lyricArray="ruleLyric"
        :nowLyricIndex="nowLyricIndex"
        ref="lyric"
        :noLyric="noLyric"
        :noLyricText="noLyricText"
        v-show="!imgCoverShow"
        @click.native="imgCoverShow = !imgCoverShow"
      />
      <div class="music-bottom">
        <!-- 播放条上一行icon -->
        <PlayMusicIcon :isLike.sync="isLike" :translate.sync="translate" />
        <!-- 播放条 -->
        <div class="slider">
          <span class="start">{{playTime}}</span>
          <van-slider
            v-model="progressWidth"
            active-color="#dd001b"
            bar-height="4px"
            :button-size="buttonSize"
            @change="changeTime"
            @drag-start="dragStart"
            @drag-end="dragEnd"
            @input="draging"
          />
          <span class="end">{{allTime | filterSetTime}}</span>
        </div>
        <!-- 功能icon -->
        <MusicButton
          @play="toggle"
          @prev="prevSong"
          @next="nextSong"
          @changeMode="changeMode"
          :mode="mode"
          @showAudioList="showAudioList"
        />
      </div>
    </div>
    <!-- 迷你播放器 -->
    <small-play
      v-show="!fullScreen"
      :imgUrl="imgUrl"
      @play="toggle"
      @showAudioList="showAudioList"
      :name="name"
      :artist="artist"
      :progressWidth="progressWidth"
      :nowLyric="nowLyric"
    />
    <!-- 播放列表 -->
    <van-action-sheet v-model="isShowAudioList">
      <div class="audio-list">
        <!-- 头部 -->
        <div class="top van-hairline--bottom">
          <div class="left on-touch" @click="changeMode">
            <i
            class="iconfont"
            :class="[{
                'icon--lbxh' : mode === 0,
                'icon-loop': mode === 1,
                'icon-suijibofang-wangyiicon': mode === 2
              }]"
            >
            </i>
            <span>
              {{ mode === 0 ? '列表循环' : mode === 1 ? '单曲循环' : '随机播放' }}
              ({{ playList.length }})
            </span>
          </div>
          <div class="right">
            <span class="on-touch"><i class="iconfont icon-chuangjianwenjianjia"></i>收藏全部</span>
            <i class="iconfont icon-trash on-touch" @click="clearAll"></i>
          </div>
        </div>
        <!-- 列表 -->
        <ul class="list">
          <!-- 瀑布流加载 -->
          <van-list
            v-model="reload"
            :finished="finished"
            finished-text="没有更多了"
            :offset="50"
            @load="onLoad"
          >
            <li
              class="list-item on-touch"
              v-for="(item, index) in songList"
              :key="index"
              @click="audioThis(item, index)"
              :class="{active: item.id === audioIngSong.id}"
            >
              <div class="info van-ellipsis">
                <i class="iconfont icon-yinliang" v-show="item.id === audioIngSong.id"></i>
                <span class="name">{{item.name}}</span>
                <span
                  class="artist"
                  :style="{color: item.id === audioIngSong.id ? '#dd001b' : '#999'}"
                  v-for="(artist, index) in item.artists || item.ar" :key="index"
                >
                {{ artist.name }}
                </span>
              </div>
              <!-- 删除此项歌曲 -->
              <i class="iconfont icon-chahao" @click.stop="deleteOneSong(item)"></i>
            </li>
          </van-list>
        </ul>
      </div>
    </van-action-sheet>
    <!-- 音频播放,谷歌浏览器自动播放会报错-->
    <!-- 解决方法, 添加预加载属性preload:auto,定义promise捕获错误 -->
    <audio
      :src="url"
      ref="audio"
      autoplay="autoplay"
      @timeupdate="playing"
      @canplay="ready"
      @error="error"
      preload="auto"
      @ended="end"
    >
    </audio>
  </div>
</template>
<script>
import DefaultNav from 'components/DefaultNav'
import ImgCover from './ImgCover'
import PlayMusicIcon from './PlayMusicIcon'
import MusicButton from './MusicButton'
import Lyric from './Lyric'
import SmallPlay from './SmallPlay'
import { songUrl, checkSong, songLyric, likeMusicList } from 'api/apis'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { filterSetTime } from 'utils/filters'
import { shuffle } from 'utils/actionsArray'
export default {
  name: 'PlayMusicIndex',
  data () {
    return {
      // 歌曲相关
      url: '',
      imgUrl: '',
      readySong: false,
      name: '',
      artist: [],
      // 播放条相关
      playTime: '00:00',
      allTime: 0,
      progressWidth: 0,
      drag: false,
      buttonSize: '8px',
      // 歌词相关
      originalLyric: '',
      chineseLyric: '',
      nowLyric: '',
      nowLyricIndex: -1,
      ruleLyric: [],
      noLyric: false,
      noLyricText: '',
      offsetLyric: 0,
      translate: false,
      // 是否为喜欢音乐
      isLike: false,
      // 瀑布流加载
      sum: 0,
      reload: false,
      finished: false,
      songList: [],
      // 其他
      imgCoverShow: true,
      isShowAudioList: false,
      timer: ''
    }
  },
  computed: {
    ...mapGetters(['playState',
      'audioList',
      'audioIngIndex',
      'playList',
      'mode',
      'audioIngSong',
      'fullScreen',
      'accountUid',
      'loginState'
    ])
  },
  watch: {
    // 当前歌曲变化，获取歌曲信息
    audioIngSong (val, oldVal) {
      if (this.playList.length) {
        // 防止切换模式时重新请求
        if (val.id === oldVal.id) {
          return
        }
        // 查看当前播放歌曲是否已喜欢
        if (this.loginState) this.getLikeMusicList(val.id)
        // 播放
        if (val.dj) {
          this.checkSong(val.mainTrackId)
        } else {
          this.checkSong(val.id)
        }
        this.allTime = val.duration ? val.duration : val.dt ? val.dt : 0
        this.artist = val.album ? (val.album.artists || val.artists) : val.ar ? val.ar : ''
        this.imgUrl = val.album ? (val.album.picUrl || val.album.artist.img1v1Url) : val.al ? val.al.picUrl
          : val.coverUrl ? val.coverUrl : ''
        this.name = val.name
        // 延迟加载图片 防止闪屏
        const bgc = document.querySelector('#mask')
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          bgc.style.background = 'url(' + this.imgUrl + '?param=800y800) center'
        }, 800)
      } else {
        // 暂停歌曲, 清空时长
        this.$refs.audio.currentTime = 0
        this.toPause()
      }
    },
    // 歌词偏移量
    offsetLyric (val, oldVal) {
      this.offsetLyric = val
    },
    // 歌词翻译
    translate: {
      handler (val, oldVal) {
        // 是否显示中文歌词
        if (val) {
          this.ruleLyric = this.chineseLyric ? this.createLrcArray(this.chineseLyric)
            : this.createLrcArray(this.originalLyric)
          if (!this.chineseLyric) {
            this.$toast('暂时没有翻译')
          }
        } else {
          this.ruleLyric = this.createLrcArray(this.originalLyric)
        }
      }
    },
    // 瀑布流加载
    audioList: {
      // 变化时将上一次列表清空
      handler (val, oldV) {
        this.sum = 0
        this.finished = false
        this.songList = []
        // 如果不为空
        if (val.length) this.division()
      }
    }
  },
  methods: {
    ...mapMutations([
      'SET_PLAY_SATE',
      'SET_AUDIO_INDEX',
      'SET_AUDIO_MODE',
      'SET_PLAY_LIST'
    ]),
    ...mapActions(['clearPlayAll', 'deleteSong']),
    // 获取音乐url
    getSongUrl (id) {
      songUrl(id)
        .then(data => {
          this.url = data.data[0].url
          // 确认可以播放, 但是无版权的url为空,跳过
          if (this.url) {
            this.getSongLyric(id)
            this.toPlay()
          } else {
            // 移出播放列表
            this.deleteSong(this.audioIngSong)
            if (this.playList.length === 0) {
              this.$toast('暂无版权')
            } else {
              this.$toast('暂无版权,播放下一首')
              this.readySong = true
              this.nextSong()
            }
          }
        })
        .catch(() => {
          this.$toast('获取url失败')
        })
    },
    // 获取已喜欢的歌曲列表
    // 得到列表数组后遍历查看当前歌曲是否在已喜欢列表中
    getLikeMusicList (id) {
      likeMusicList(this.accountUid)
        .then(data => {
          this.filterAudio(data.ids, id)
        })
        .catch(() => {
          this.$toast('获取已喜欢的列表失败')
        })
    },
    // 判断当前歌曲是否在已喜欢数组中
    filterAudio (arr, id) {
      this.isLike = arr.indexOf(id) > -1
    },
    // 查看歌曲是否可以播放
    checkSong (id) {
      checkSong(id)
        .then(data => {
          // 当可以播放的时候请求歌曲url
          if (data.success) {
            this.getSongUrl(id)
          }
        })
        .catch(err => {
          if (err) {
            // 移出播放列表
            this.deleteSong(this.audioIngSong)
            if (this.playList.length === 0) {
              this.$toast('暂无版权')
            } else {
              this.$toast('暂无版权,播放下一首')
              this.readySong = true
              this.nextSong()
            }
          }
        })
    },
    // 当浏览器可以播放资源时
    ready () {
      this.readySong = true
    },
    // 当在资源加载期间发生错误时
    error () {
      this.readySong = false
    },
    // 当改变进度条时改变歌曲播放时间,value为vant回调参数
    changeTime (value) {
      const audio = this.$refs.audio
      const current = value * audio.duration / 100
      audio.currentTime = current
    },
    // 播放条拖拽
    dragStart () {
      this.drag = true
      this.buttonSize = '12px'
    },
    dragEnd () {
      this.drag = false
      this.buttonSize = '8px'
    },
    // value为vant回调参数
    draging (value) {
      const audio = this.$refs.audio
      if (this.drag) {
        const current = value * audio.duration / 100
        this.setTime(current)
      }
    },
    setTime (current) {
      // 计算到当前的播放时间
      const minutes = Math.floor(current / 60)
      const seconds = Math.floor(current - minutes * 60)
      // 进行格式转换
      const minuteValue = minutes < 10 ? '0' + minutes : minutes
      const secondValue = seconds < 10 ? '0' + seconds : seconds
      this.playTime = minuteValue + ':' + secondValue
    },
    // 播放中
    playing () {
      const audio = this.$refs.audio
      // 是否拖拽中
      if (!this.drag) {
        // 第一次播放时 duration 为 0, barLength 为 NaN
        const barLength = audio.currentTime / audio.duration * 100
        this.setProgress(isNaN(barLength) ? 0 : barLength)
        this.setTime(audio.currentTime)
      }
      // 设置歌词偏移
      const playTime = audio.currentTime + this.offsetLyric
      const index = this.getCurrentIndex(playTime, this.ruleLyric)
      this.nowLyricIndex = index
      // 设置歌词显示
      this.showLyric(index, this.ruleLyric)
      // 传入当前歌词索引信息
      this.$refs.lyric.setCurrent(this.nowLyricIndex)
    },
    // 设置进度条长度
    setProgress (val) {
      this.progressWidth = val
    },
    // 获取歌曲歌词
    getSongLyric (id) {
      songLyric(id)
        .then(data => {
          if (data.lrc) {
            this.noLyric = false
            // 翻译歌词原本歌词
            this.chineseLyric = data.tlyric.lyric
            this.originalLyric = data.lrc.lyric
            this.ruleLyric = this.createLrcArray(this.originalLyric)
          } else if (data.nolyric || data.sgc) {
            // 当前歌曲没有歌词
            this.ruleLyric = []
            this.nowLyric = ''
            this.noLyric = true
            this.noLyricText = '纯音乐，请欣赏'
          } else {
            // 没有歌词
            this.noLyricText = '暂时没有歌词'
            this.ruleLyric = []
            this.nowLyric = ''
            this.noLyric = true
          }
        })
        .catch(() => {
          this.$toast('获取歌词失败')
        })
    },
    // 创建歌词数组
    createLrcArray (lrc) {
      const parts = lrc.split('\n')
      for (let index = 0; index < parts.length; index++) {
        const element = parts[index]
        parts[index] = this.changeToObject(element)
      }
      return parts
    },
    // 根据一行歌词 转换为对象
    changeToObject (str) {
      const wordsReg = /\[\d{0,}:\d{0,}.\d{0,}\]|\[\d{0,}:\d{0,}:\d{0,}\]/
      const length = str.split(wordsReg).length
      const words = str.split(wordsReg)[length - 1]
      // 返回时间信息
      const reg = /\d{0,}:\d{0,}.\d{0,}/g
      let timeArray = reg.exec(str)
      if (!timeArray) {
        return
      }
      timeArray = timeArray[0].split(':')
      const minute = parseInt(timeArray[0]) // 分钟数
      const second = parseFloat(timeArray[1]) // 秒数
      const time = minute * 60 + second
      return {
        time,
        words
      }
    },
    // 获取当前歌词索引
    getCurrentIndex (time, lyricArray) {
      for (let i = lyricArray.length - 2; i >= 0; i--) {
        const element = lyricArray[i].time
        if (time > element) {
          return i
        }
        if (!element) {
          return -1
        }
      }
      return -1 // 防止没数据时报错
    },
    // 设置当前歌词显示信息
    showLyric (index, array) {
      if (index !== -1) {
        const words = array[index].words
        this.nowLyric = words
      }
    },
    // 单曲循环模式
    loop () {
      this.$refs.audio.currentTime = 0
      this.toPlay()
    },
    // 改变歌曲播放模式
    changeMode () {
      const toastMode = this.$toast({
        position: 'bottom',
        className: 'phone-toast'
      })
      const mode = (this.mode + 1) % 3
      this.SET_AUDIO_MODE(mode)
      let shufflePlayList
      if (mode === 2) {
        shufflePlayList = shuffle(this.audioList)
        toastMode.message = '随机模式'
      } else {
        shufflePlayList = this.audioList
        toastMode.message = mode === 1 ? '单曲循环' : '列表循环'
      }
      this.resetCurrentIndex(shufflePlayList)
      this.SET_PLAY_LIST(shufflePlayList)
    },
    // 设置当前播放索引
    resetCurrentIndex (list) {
      const index = list.findIndex(item => {
        return item.id === this.audioIngSong.id
      })
      this.SET_AUDIO_INDEX(index)
    },
    // 上一首歌曲切换
    prevSong () {
      if (!this.readySong) {
        this.$toast('正在加载中')
        return
      }
      // 只有一首歌时
      if (this.audioList.length === 1) {
        this.loop()
        return
      }
      let nowIndex = this.audioIngIndex - 1
      if (nowIndex === -1) {
        nowIndex = this.audioList.length - 1
      }
      this.SET_AUDIO_INDEX(nowIndex)
      this.readySong = false
    },
    // 下一首歌曲切换
    nextSong () {
      if (!this.readySong) {
        this.$toast('正在加载中')
        return
      }
      // 只有一首歌时
      if (this.audioList.length === 1) {
        this.loop()
        return
      }
      let nowIndex = this.audioIngIndex + 1
      if (nowIndex === this.audioList.length) {
        nowIndex = 0
      }
      this.SET_AUDIO_INDEX(nowIndex)
      this.readySong = false
    },
    // 播放歌曲
    toPlay () {
      const promise = this.$refs.audio.play()
      if (promise !== undefined) {
        promise.then(_ => {
          this.SET_PLAY_SATE(true)
        }).catch(_ => {
          this.SET_PLAY_SATE(true)
        })
      }
    },
    // 暂停歌曲
    toPause () {
      this.$refs.audio.pause()
      this.SET_PLAY_SATE(false)
    },
    // 播放暂停事件
    toggle () {
      if (this.playState) {
        this.toPause()
      } else {
        this.toPlay()
      }
    },
    // 当歌曲播放完成之后 根据播放模式播放
    end () {
      switch (this.mode) {
        case 0:
          this.nextSong()
          break
        case 1:
          this.loop()
          break
        case 2:
          this.nextSong()
          break
      }
    },
    // 显示歌曲列表
    showAudioList () {
      this.isShowAudioList = !this.isShowAudioList
    },
    // 正在播放项
    audioThis (item, index) {
      // 随机播放情况
      if (this.mode === 2) {
        // 找到对应歌曲的索引
        index = this.playList.findIndex((song) => {
          return song.id === item.id
        })
      }
      this.SET_AUDIO_INDEX(index)
    },
    // 删除,只有一项时关闭展示列表
    deleteOneSong (song) {
      if (this.playList.length === 1) {
        this.showAudioList()
        this.deleteSong(song)
      } else {
        this.deleteSong(song)
      }
    },
    // 清空播放列表
    clearAll () {
      this.$dialog.confirm({
        message: '确认要清空播放列表？'
      })
        .then(() => {
          this.showAudioList()
          this.clearPlayAll()
        })
        .catch(() => {
          this.$toast('已取消')
        })
    },
    // 瀑布流滚动加载,数据太多容易卡顿,30个为一组
    division () {
      const result = []
      for (var i = 0; i < this.audioList.length; i += 30) {
        result.push(this.audioList.slice(i, i + 30))
      }
      this.songList.push(...result[this.sum])
      // 加载状态结束
      this.reload = false
      // 数据全部加载完成
      if (this.songList.length >= this.audioList.length) {
        this.finished = true
      }
    },
    onLoad () {
      this.sum++
      this.division()
    }
  },
  filters: {
    filterSetTime
  },
  components: {
    DefaultNav,
    ImgCover,
    Lyric,
    PlayMusicIcon,
    MusicButton,
    SmallPlay
  }
}
</script>
<style lang='scss' scoped>
// 通过fixed 定位
.play-music {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  // 全屏播放器
  .full-screen {
    position: relative;
    height: 100vh;
    background: rgba(0, 0, 0, .7);
    // 高斯模糊
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
    .img-bgc {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
    }
    // 固定在底部
    .music-bottom {
      position: fixed;
      bottom: 0;
      width: 100%;
      .slider {
        display: flex;
        align-items: center;
        padding: .3rem .3rem;
        color: #fff;
        font-size: .24rem;
        .start {
          padding-right: .2rem;
        }
        .end {
          padding-left: .2rem;
        }
      }
    }
  }
  .audio-list {
    position: relative;
    // 这里不使用fixed是vant有transform
    .top {
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      width: 100%;
      background-color: #fff;
      .left {
        height: 1rem;
        line-height: 1rem;
        padding-left: .2rem;
        font-size: .26rem;
        color: black;
        i {
          font-size: .3rem;
        }
        span {
          margin-left: .1rem;
        }
      }
      .right {
        height: 1rem;
        line-height: 1rem;
        color: black;
        span {
          display: inline-block;
          height: 1rem;
          padding-right: .2rem;
        }
        i {
          display: inline-block;
          height: 1rem;
          padding: 0 .2rem;
          font-size: .28rem;
        }
      }
    }
    // 配合overflow scroll,在隐藏滚动条
    .list {
      height: 55vh;
      padding-top: 1rem;
      overflow: scroll;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .8rem;
        padding: 0 .2rem;
        .info {
          width: 88vw;
          .icon-yinliang {
            font-size: .35rem;
            padding-right: .2rem;
          }
          .name {
            padding-right: .04rem;
            line-height: .8rem;
            font-size: .3rem;
            &::after {
              content: "-";
              margin: 0 0 .02rem .05rem;
              font-size: .23rem;
            }
          }
          .artist {
            line-height: .8rem;
            font-size: .23rem;
            &::after {
              content: "/";
              font-size: .2rem;
            }
            &:last-of-type::after {
              content: "";
            }
          }
        }
        .icon-chahao {
          display: inline-block;
          height: .8rem;
          line-height: .8rem;
          font-size: .35rem;
          color: #999;
        }
      }
    }
  }
}
.active {
  color: #dd001b;
}
</style>
