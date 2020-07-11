<template>
  <div class="search-result">
    <search-input
      :text="keyword ? keyword : $route.query.text"
      @searchResult="searchResult"
    />
    <!-- 选项卡 -->
    <van-tabs
      v-model="active"
      swipeable
      class="nav-tabs"
      :class="{'small-height': $store.state.audioList.length}"
      line-width="0.6rem"
      color="#fff"
      background="#dd001b"
    >
      <!-- 综合 -->
      <van-tab
        class= "nav-tab"
        :title="searchData[0].title"
      >
        <loading :height="4.58" v-show="loading"/>
        <result-all-type
          v-show="!loading"
          :data="searchData[0].data"
          :active.sync="active"
          @searchSim="searchResult"
        />
      </van-tab>
      <!-- 其他分类 -->
      <van-tab
        class= "nav-tab"
        v-for="(data, index) in searchData.slice(1)"
        :key="index"
        :title="data.title"
      >
        <!-- 瀑布流加载 -->
        <van-list
          :class="{'small-height': $store.state.audioList.length}"
          v-model="reload"
          :finished="finished"
          :finished-text="'没有更多了'"
          :offset="100"
          @load="onLoad"
        >
          <!-- 搜索结果列表 -->
          <loading :height="4.58" v-show="loading"/>
          <div class="result-list-con" v-show="!loading">
            <result-public
              :active="active"
              :data="data.data"
              :keywords="$route.query.text"
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
import ResultAllType from './ResultAllType'
import Loading from 'components/Loading'
import { search } from 'api/apis'
export default {
  name: 'SearchResult',
  data () {
    return {
      active: 0,
      // 加载相关
      loading: true,
      reload: false,
      finished: false,
      list: [],
      keyword: '',
      searchData: [{
        title: '综合',
        type: 1018
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
    // 添加新属性data, sum
    for (let index = 0; index <= 6; index++) {
      this.$set(this.searchData[index], 'data', [])
      this.$set(this.searchData[index], 'sum', -1)
    }
    this.getSearch(this.$route.query.text, 0, 1018)
  },
  watch: {
    // active 变化清空数据
    active: {
      handler (val, oldV) {
        // 需要清空数据
        this.finished = false
        this.list = []
        // 请求综合
        if (this.searchData[0].data.length === 0) {
          if (val === 0) {
            // 到达顶部
            window.scrollTo(0, 0)
            this.getSearch(this.keyword, 0, 1018)
          }
        }
      }
    },
    keyword (val, oldV) {
      // 搜索词变化需要清空上一次结果
      for (let index = 0; index <= 6; index++) {
        this.searchData[index].data = []
        this.searchData[index].sum = -1
      }
      // 搜索综合
      this.active = 0
    },
    '$route.query.text': {
      handler (val, oldV) {
        if (val) {
          this.searchResult(val)
        }
      }
    }
  },
  methods: {
    searchResult (keyword) {
      this.keyword = keyword
      // 需要清空数据
      this.finished = false
      this.list = []
      this.searchData[this.active].data = []
      this.searchData[this.active].sum = 0
      this.loading = true
      this.getSearch(keyword, 0, this.searchData[this.active].type)
    },
    getSearch (keyword, offset, type) {
      search(keyword, 30, offset, type)
        .then(data => {
          if (data.result) {
            this.list = data.result
            this.division()
          } else {
            // 直接结束
            this.finished = true
            this.reload = false
          }
        })
        .catch(() => {
          this.$toast('获取搜索结果失败')
        })
    },
    // 30个为一组
    async division () {
      const dataName = ['', 'songs', 'videos', 'artists', 'albums', 'playlists', 'userprofiles']
      if (this.active === 0) {
        this.searchData[0].data = this.list
        // 直接结束
        this.finished = true
      } else {
        // 数据全部加载完成, (data || [])防止报错
        if ((this.list[dataName[this.active]] || []).length === 0) {
          this.finished = true
        } else {
          await this.searchData[this.active].data.push(...(this.list[dataName[this.active]]))
        }
      }
      // 加载状态结束
      this.$nextTick(() => {
        this.loading = false
        this.reload = false
      })
    },
    onLoad () {
      if (this.active !== 0) {
        this.searchData[this.active].sum++
        // 推荐歌单以及其他分类
        const keyword = this.keyword ? this.keyword : this.$route.query.text
        this.getSearch(keyword, this.searchData[this.active].sum * 30, this.searchData[this.active].type)
      }
    }
  },
  components: {
    SearchInput,
    ResultPublic,
    ResultAllType,
    Loading
  }
}
</script>
<style lang='scss' scoped>
.search-result {
  height: 100vh;
}
</style>
