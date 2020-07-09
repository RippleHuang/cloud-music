import { throttle } from 'utils/throttle'
// list列表
export const listRefresh = {
  data () {
    return {
      songList: [],
      songListAll: [],
      loading: true,
      sum: 0,
      load: false,
      finish: false
    }
  },
  activated () {
    this.sum = 0
    this.finish = false
    this.songList = []
  },
  methods: {
    // 瀑布流滚动加载,数据太多容易卡顿,30个为一组
    division () {
      const result = []
      for (var i = 0; i < this.songListAll.length; i += 30) {
        result.push(this.songListAll.slice(i, i + 30))
      }
      this.songList.push(...result[this.sum])
      this.$nextTick(() => {
        this.loading = false
        // 加载状态结束
        this.load = false
      })
      // 数据全部加载完成
      if (this.songList.length >= this.songListAll.length) {
        this.finish = true
      }
    },
    onLoad () {
      this.sum++
      this.division()
    }
  }
}
// 滚动
export const scroll = {
  data () {
    return {
      isFixed: false,
      opacity: 1
    }
  },
  activated () {
    window.addEventListener('scroll', this.scrollHandler, true)
  },
  methods: {
    // 粘性时变化样式
    scrollHandler () {
      throttle(this.scroll(), 0.08)
    },
    scroll () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = document.documentElement.clientHeight
      if (scrollTop / clientHeight >= 0.3) {
        this.isFixed = true
      } else {
        const opa = 1 - (3.3 * scrollTop / clientHeight).toFixed(2)
        this.opacity = opa >= 0 ? opa : 0
        this.isFixed = false
      }
    }
  },
  deactivated () {
    window.removeEventListener('scroll', this.scrollHandler, true)
  }
}
