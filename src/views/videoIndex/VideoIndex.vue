<template>
  <div class="video-index">
    <!-- 选项卡 -->
    <van-tabs
      v-model="active"
      swipeable
      class="nav-tabs"
      line-width="0.6rem"
      color="#fff"
      background="#dd001b"
    >
      <!-- 选项item -->
      <!-- 标题有些有#,需要去除 -->
      <van-tab
        class= "nav-tab"
        v-for="(data, index) in listTag"
        :key="index"
        :title="data.name.replace(/#/g, '')"
      >
        <!-- 瀑布流加载 -->
        <van-list
          v-model="reload"
          :finished="finished"
          :finished-text="'没有更多了'"
          :offset="100"
          @load="onLoad"
        >
          <!-- 视频列表 -->
          <div class="video-list-con" v-show="!loading">
            <video-card
              v-for="(item, index) in data.data" :key="index"
              :data="item.data"
              :active="active"
            />
          </div>
          <!-- vant list插槽 -->
          <template #loading>
            <loading :height="1.5" v-show="reload"/>
          </template>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import VideoCard from 'components/VideoCard'
import Loading from 'components/Loading'
import { videoTag, videoGroup } from 'api/apis'
import { getRandomNumberArray } from 'utils/randomNumberArray'
export default {
  name: 'VideoIndex',
  data () {
    return {
      active: 0,
      // 加载相关
      loading: true,
      reload: false,
      finished: false,
      // 数据
      listTag: [],
      data: []
    }
  },
  created () {
    this.getVideoTag()
  },
  watch: {
    // active 变化清空数据
    active: {
      handler () {
        this.finished = false
        this.data = []
        // 首次需要加载
        if (this.listTag[this.active].data.length === 0) {
          this.loading = true
        }
      }
    }
  },
  methods: {
    getVideoTag () {
      videoTag()
        .then(data => {
          // 随机16个tag
          this.listTag = getRandomNumberArray(data.data, 16)
          // 添加新属性data, 新属性sum, showVideo
          for (let index = 0; index <= this.listTag.length - 1; index++) {
            // 两种方法
            this.listTag[index] = Object.assign({}, this.listTag[index], { data: [] })
            this.$set(this.listTag[index], 'sum', 0)
          }
        })
        .catch(() => {
          this.$toast('获取视频标签失败')
        })
    },
    getVideoGroup (id, offset) {
      videoGroup(id, offset)
        .then(data => {
          this.data = data.datas
          this.division()
        })
        .catch(() => {
          this.$toast('获取对应视频失败')
        })
    },
    // 接口默认8个为一组
    division () {
      this.listTag[this.active].data.push(...this.data)
      // 加载状态结束
      this.$nextTick(() => {
        this.loading = false
        this.reload = false
      })
      // 数据全部加载完成
      if (this.listTag[this.active].data.length >= 80) {
        this.finished = true
      }
    },
    onLoad () {
      this.listTag[this.active].sum++
      // 获取对应视频分类的数据
      this.getVideoGroup(this.listTag[this.active].id, this.listTag[this.active].sum)
    }
  },
  components: {
    VideoCard,
    Loading
  }
}
</script>
<style lang="scss" scoped>
.video-index {
  // 固定高度,否则list无限load
  height: 100vh;
}
</style>
