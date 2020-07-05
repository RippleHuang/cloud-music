<template>
  <div class="search-result">
    <search-input />
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
      <van-tab
        class= "nav-tab"
        v-for="(data, index) in searchData"
        :key="index"
        :title="data.title"
      >
        <!-- 瀑布流加载 -->
        <van-list
          v-model="reload"
          :finished="finished"
          :finished-text="'没有更多了'"
          :offset="100"
          @load="onLoad"
        >
          <!-- 搜索结果列表 -->
          <div class="result-list-con" v-show="!loading">
            <result-public
              :active="active"
              :data="data.data"
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
import SearchInput from './SearchInput'
import ResultPublic from './ResultPublic'
import Loading from 'components/Loading'
import { search } from 'api/apis'
export default {
  name: 'SearchResult',
  data () {
    return {
      active: 1,
      // 加载相关
      loading: true,
      reload: false,
      finished: false,
      list: [],
      searchData: [{
        title: '综合',
        type: 1080
      }, {
        title: '单曲',
        type: 1
      }, {
        title: '视频',
        type: 1014
      }, {
        title: '歌手',
        type: 100
      }, {
        title: '专辑',
        type: 10
      }, {
        title: '歌单',
        type: 1000
      }, {
        title: '用户',
        type: 1002
      }]
    }
  },
  created () {
    // 添加新属性data, sum, moreText
    for (let index = 0; index <= 6; index++) {
      this.$set(this.searchData[index], 'data', [])
      this.$set(this.searchData[index], 'sum', -1)
      this.$set(this.searchData[index], 'moreText', '')
      this.$set(this.searchData[index], 'allNumber', 0)
    }
  },
  watch: {
    // active 变化清空数据
    active: {
      handler () {
        this.finished = false
        this.list = []
        // 首次需要加载
        if (this.searchData[this.active].data.length === 0) {
          this.loading = true
        }
      }
    }
  },
  methods: {
    getSearch (offset, type) {
      search(this.$route.query.text, 30, offset, type)
        .then(data => {
          this.list = data.result
          this.division()
        })
        .catch(() => {
          this.$toast('获取搜索结果失败')
        })
    },
    // 30个为一组
    division () {
      if (this.active === 0) {
        // 获取对应的 moreText
        const arr = ['song', 'video', 'artist', 'album', 'playlist', 'user']
        arr.forEach((val, index) => {
          this.searchData[index + 1].moreText = this.list[val].moreText
          // 提取字符串中的数字
          this.searchData[index + 1].allNumber = this.list[val].moreText.replace(/[^0-9]/g, '')
        })
      } else {
        const dataName = ['', 'songs', 'videos', 'artists', 'albums', 'playlists', 'userprofiles']
        this.searchData[this.active].data.push(...this.list[dataName[this.active]])
      }
      // 加载状态结束
      this.$nextTick(() => {
        this.loading = false
        this.reload = false
      })
      // 综合直接结束
      if (this.active) {
        // 数据全部加载完成
        if (this.searchData[this.active].data.length >= this.searchData[this.active].allNumber) {
          this.finished = true
        }
      } else {
        this.finished = true
      }
    },
    onLoad () {
      if (this.active !== 0) {
        this.searchData[this.active].sum++
        // 推荐歌单以及其他分类
        this.getSearch(this.searchData[this.active].sum, this.searchData[this.active].type)
      } else {
        /// 当为综合时
        this.getSearch(30, 1080)
      }
    }
  },
  components: {
    SearchInput,
    ResultPublic,
    Loading
  }
}
</script>
<style lang='scss' scoped>
.search-result {
  height: 100vh;
}
</style>
