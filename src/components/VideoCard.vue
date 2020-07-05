<template>
  <div class="video-item" :class="{'video-style': !dynamic}">
    <!-- 视频预览图片,播放时隐藏 -->
    <div
    class="viedo-img"
    :style="{
      display: videoCanPlay ? 'none': 'block',
      height: dynamic ? '3.1rem': '3.7rem'
      }"
    >
      <!-- video或mv -->
      <img :src="(data.coverUrl ? data.coverUrl : data.imgurl) + '?param=350y200'" alt="">
      <div class="mask"></div>
      <span class="tag" v-if="!dynamic">{{ data.videoGroup ? data.videoGroup[0].name : ''}}</span>
      <span class="playtime">
        <i class="iconfont icon-gedanbofangliang_"></i>
        {{data.playTime || data.playCount | filterPlayCount}}
      </span>
      <span class="duration">
        <i class="iconfont icon-paihangbang"></i>
        {{data.durationms || data.duration | filterSetTime}}
      </span>
      <i class="iconfont icon-bofang" @click="getUrl"></i>
    </div>
    <!-- 视频播放 -->
    <div
      class="play-video"
      :style="{display: videoCanPlay ? 'block': 'none'}"
    >
      <video
        @canplay="startPlay"
        @timeupdate="playing"
        class="video-mp4"
        ref="video"
        src="url"
      ></video>
      <!-- 显示隐藏 -->
      <div class="action" ref="action" @click="sliderToggle">
        <!-- 播放暂停 -->
        <i
          class="iconfont"
          :class="{'icon-bofang': !play, 'icon-zantingtingzhi': play}"
          @click.stop="videoToggle"
        >
        </i>
        <p class="time">
          <span class="start">{{playTime}}</span>
          <span class="end">/{{data.durationms || data.duration | filterSetTime}}</span>
        </p>
        <!-- 播放条 -->
        <div class="slider">
          <van-slider
            v-model="progressWidth"
            active-color="#dd001b"
            :button-size="buttonSize"
            @change="changeTime"
            @drag-start="dragStart"
            @drag-end="dragEnd"
            @input="draging"
          />
        </div>
      </div>
    </div>
    <!-- 底部信息,动态页隐藏 -->
    <div class="video-bottom" v-if="!dynamic">
      <!-- video或mv -->
      <p class="title van-multi-ellipsis--l2">{{data.title}}</p>
      <div class="content-box">
        <div class="info" @click="$router.push('/userInfo?accountUid=' + data.creator.userId)">
          <img :src="data.creator.avatarUrl + '?param=50y50'" alt />
          <span class="name van-ellipsis">{{data.creator.nickname}}</span>
        </div>
        <div class="right">
          <span @click="noAchieve">
            <i class="iconfont icon-zanpress"></i>
            <i class="num">{{data.praisedCount | filterPlayCount}}</i>
          </span>
          <span @click="noAchieve">
            <i class="iconfont icon-pinglun"></i>
            <i class="num">{{data.commentCount | filterPlayCount}}</i>
          </span>
          <i class="iconfont icon-sandian" @click="noAchieve"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { filterPlayCount, filterSetTime } from 'utils/filters'
import { videoUrl, mvUrl } from 'api/apis'
export default {
  name: 'VideoCard',
  props: {
    data: {
      type: Object
    },
    active: {
      type: Number
    },
    // 动态传过来的
    dynamic: {
      type: Boolean
    }
  },
  data () {
    return {
      // 播放按钮
      play: '',
      // 是否显示视频
      videoCanPlay: false,
      // 是否不显示滑块
      slider: true,
      timer: null,
      progressWidth: 0,
      lastIndex: 0,
      playTime: '00:00',
      drag: false,
      buttonSize: '8px'
    }
  },
  watch: {
    active: {
      handler (val, oldV) {
        // 暂停视频与隐藏
        this.videoPause()
        this.videoCanPlay = false
      }
    },
    // 监听歌曲播放状态
    '$store.state.playState' (val, oldV) {
      // 播放歌曲时暂停隐藏视频
      if (val) {
        this.videoPause()
        this.videoCanPlay = false
      }
    }
  },
  methods: {
    // 获取url
    getUrl () {
      const video = this.$refs.video
      // 给src设置默认值为url,防止重复加载视频
      if (video.src.includes('url')) {
        // 动态页与视频页的视频
        if (this.data.videoId || this.data.vid) {
          const vid = this.data.videoId ? this.data.videoId : this.data.vid
          videoUrl(vid)
            .then(data => {
              // 得到url
              video.src = data.urls[0].url
            })
            .catch(() => {
              this.$toast('获取视频失败')
            })
        } else { // mv
          // 获取mv
          mvUrl(this.data.id)
            .then(data => {
              // 得到url
              video.src = data.data.url
              this.startPlay()
            })
            .catch(() => {
              this.$toast('获取mv失败')
            })
        }
      } else { // 已经加载完的不用再请求,直接播放
        video.currentTime = 0
        this.videoPlay()
      }
    },
    // 准备就绪
    startPlay () {
      this.videoCanPlay = true
      // 播放前清空歌曲播放列表,暂停其他的视频
      this.$store.dispatch('clearPlayAll')
      this.pauseAll()
      // 播放
      this.videoPlay()
    },
    // 播放视频
    videoPlay () {
      const video = this.$refs.video
      const promise = video.play()
      if (promise !== undefined) {
        promise.then(_ => {
          this.play = true
          this.sliderToggle()
        }).catch(_ => {
          this.$toast('播放失败')
        })
      }
    },
    // 暂停视频
    videoPause () {
      const video = this.$refs.video
      video.pause()
      this.play = false
      this.sliderToggle()
    },
    // 播放暂停
    videoToggle () {
      const video = this.$refs.video
      if (video.paused) {
        // 播放
        this.videoPlay()
      } else {
        // 暂停
        this.videoPause()
      }
    },
    // 计算到当前的播放时间
    setTime (current) {
      const minutes = Math.floor(current / 60)
      const seconds = Math.floor(current - minutes * 60)
      // 进行格式转换
      const minuteValue = minutes < 10 ? '0' + minutes : minutes
      const secondValue = seconds < 10 ? '0' + seconds : seconds
      this.playTime = minuteValue + ':' + secondValue
    },
    // 播放中
    playing () {
      const video = this.$refs.video
      // 是否拖拽中
      if (!this.drag) {
        const barLength = video.currentTime / video.duration * 100
        this.setProgress(barLength)
        this.setTime(video.currentTime)
      }
      // 播放完隐藏
      if (video.currentTime / video.duration === 1) {
        this.videoCanPlay = false
      }
    },
    // 设置进度条长度
    setProgress (val) {
      // 当加载第一个时, val为NaN
      this.progressWidth = isNaN(val) ? 0 : val
    },
    // 当改变进度条时改变歌曲播放时间,value为vant回调参数
    changeTime (value) {
      const video = this.$refs.video
      const current = value * video.duration / 100
      video.currentTime = current
      this.videoPlay()
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
      const video = this.$refs.video
      if (this.drag) {
        const current = value * video.duration / 100
        this.setTime(current)
      }
      this.sliderToggle()
    },
    // 暂停其他视频
    pauseAll () {
      var video = document.getElementsByTagName('video')
      // 暂停函数
      function pauseAll () {
        var _this = this;
        [].forEach.call(video, function (i) {
          // 将videos中其他的video全部暂停
          i !== _this && i.pause()
        })
      }
      // 给play事件绑定暂停函数
      [].forEach.call(video, function (i) {
        i.addEventListener('play', pauseAll.bind(i))
      })
    },
    // 显示隐藏按钮,滑块
    sliderToggle () {
      const _this = this
      _this.$refs.action.classList.remove('slider-toggle')
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(function () {
        _this.$refs.action.classList.add('slider-toggle')
      }, 2000)
    },
    noAchieve () {
      this.$toast('此功能尚未开通, 敬请期待')
    }
  },
  filters: {
    filterPlayCount,
    filterSetTime
  }
}
</script>
<style lang='scss' scoped>
.video-item {
  // 视频卡片
  .viedo-img {
    position: relative;
    width: 100%;
    padding: 0;
    border-radius: .2rem;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
      border-radius: .1rem;
    }
    // 蒙版
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(136, 134, 134, 0.5);
    }
    // 视频标签
    .tag {
      position: absolute;
      top: .2rem;
      right: .2rem;
      display: block;
      padding: .1rem .15rem;
      color: #fff;
      border-radius: .3rem;
      border: .01rem solid rgba(255, 255, 255, .15);
      font-size: .22rem;
      background-color: rgba(255, 255, 255, 0.1);
    }
    // 中间播放icon
    .icon-bofang {
      position: absolute;
      top: 50%;
      left: 50%;
      color: rgba(255, 255, 255, .7);
      font-size: .8rem;
      transform: translate(-50%, -50%);
    }
    // 右边时间
    .duration {
      position: absolute;
      right: .15rem;
      bottom: .15rem;
      color: #fff;
      font-size: .24rem;
      i {
        padding-right: .05rem;
        font-size: .2rem;
      }
    }
    // 左边播放量
    .playtime {
      @extend .duration;
      left: .15rem;
      .icon-gedanbofangliang_ {
        padding-right: 0;
      }
    }
  }
  // 视频
  .play-video {
    position: relative;
    border-radius: .2rem;
    overflow: hidden;
    .video-mp4 {
      width: 100%;
    }
    .action {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 98%;
      box-shadow: 0px 0px 18px 18px rgba(0, 0, 0, .4) inset;
      .iconfont {
        position: absolute;
        top: 50%;
        left: 50%;
        color: rgba(255, 255, 255, .7);
        font-size: .8rem;
        transform: translate(-50%, -50%);
      }
      .time {
        position: absolute;
        left: .2rem;
        bottom: .2rem;
        color: #fff;
        font-size: .2rem;
      }
      .slider{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 .15rem;
        box-sizing: border-box;
      }
    }
  }
  // 底部条
  .video-bottom {
    .title {
      padding: .3rem 0;
      line-height: 1.3;
    }
    .content-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: .9rem;
      padding: .2rem 0;
      border-top: .01rem solid #ddd;
      .info {
        color: black;
        img {
          width: .7rem;
          height: .7rem;
          border-radius: 50%;
        }
        .name {
          margin-left: .2rem;
          font-size: .28rem;
        }
      }
      .right {
        height: .9rem;
        line-height: .9rem;
        color: rgb(131, 126, 126);
        span {
          margin-right: .5rem;
          &:active {
            color: rgb(212, 206, 206);
          }
          i {
            font-size: .28rem;
          }
        }
        .icon-sandian {
          color: black;
        }
      }
    }
  }
}
// 隐藏滑块与按钮
.slider-toggle {
  opacity: 0;
  transition: opacity .5s ease-out;
}
.video-style {
  padding: .2rem .3rem 0;
  border-bottom: .2rem solid #ccc;
}
</style>
