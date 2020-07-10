<template>
  <div class="landscape">
    <video-card
      :data="videoData"
      :type="+$route.query.type"
      dynamic
      landscape
      :refresh="refresh"
      :isFullscreen="isFullscreen"
    />
  </div>
</template>
<script>
import VideoCard from 'components/VideoCard'
import { videoDetail, mvDetail } from 'api/apis'
import screenfull from 'screenfull'
export default {
  name: 'Landscape',
  data () {
    return {
      videoData: [],
      isFullscreen: false,
      refresh: 0
    }
  },
  watch: {
    '$route.query.vid': {
      handler (val, oldV) {
        this.initScreenfull()
        if (val) {
          this.getDetail(val)
        }
      },
      immediate: true
    },
    videoData: {
      deep: true,
      handler () {
        this.refresh = +new Date()
      }
    }
  },
  created () {
    screenfull.request()
  },
  methods: {
    // 获取视频详情
    getDetail (id) {
      if (+this.$route.query.type === 1) {
        videoDetail(id)
          .then(data => {
            this.videoData = data.data
          })
          .catch(() => {
            this.$toast('获取视频失败')
          })
      } else {
        mvDetail(id)
          .then(data => {
            this.videoData = data.data
          })
          .catch(() => {
            this.$toast('获取mv失败')
          })
      }
    },
    // 全屏
    initScreenfull () {
      if (screenfull.isEnabled) {
        screenfull.request()
        screenfull.on('change', () => {
          this.isFullscreen = screenfull.isFullscreen
        })
      } else {
        this.$toast('该浏览器不支持全屏')
        this.isFullscreen = false
      }
    }
  },
  components: {
    VideoCard
  }
}
</script>
<style lang='scss' scoped>

</style>
