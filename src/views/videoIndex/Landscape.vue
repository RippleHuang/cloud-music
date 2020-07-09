<template>
  <div class="landscape">
    <video-card
      :data="videoData"
      :type="+$route.query.type"
      dynamic
      landscape
      :refresh="refresh"
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
  activated () {
    this.initScreenfull()
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
      screenfull.toggle()
    }
  },
  components: {
    VideoCard
  }
}
</script>
<style lang='scss' scoped>

</style>
