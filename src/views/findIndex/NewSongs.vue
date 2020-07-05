<template>
  <div class="new-songs">
    <DefaultNav
      :title="'最新音乐'"
      :background="'#dd001b'"
      :height="'1.2rem'"
      defaultShow
    />
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
        v-for="(data, index) in getData"
        :key="index"
        :title="data.title"
      >
        <div class="song-title" :style="{background: data.bgc}">
          <div class="mask" :style="{background: data.bgc}"></div>
          <p class="title">{{data.title}}</p>
        </div>
        <!-- 歌曲列表 -->
        <pubcli-sticky
          show
          newSong
          :loading="loading"
          :trackCount="trackCount"
          :songList="songList"
          :songListAll="data.data"
          :load="load"
          :finish="finish"
          :newAndrecommed="'0 0.2rem 0 0.25rem'"
          :stickyTop="'1.95rem'"
          @reLoad="onLoad"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import DefaultNav from 'components/DefaultNav'
import PubcliSticky from 'components/PubcliSticky'
import { listRefresh, scroll } from '@/mixins/mixins'
import { newSongs } from 'api/apis'
export default {
  name: 'NewSongs',
  mixins: [listRefresh, scroll],
  data () {
    return {
      active: 0,
      trackCount: 0,
      getData: [{
        title: '推荐',
        data: [],
        type: 0,
        bgc: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)'
      }, {
        title: '华语',
        data: [],
        type: 7,
        bgc: 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)'
      }, {
        title: '欧美',
        data: [],
        type: 96,
        bgc: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }, {
        title: '韩国',
        data: [],
        type: 16,
        bgc: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)'
      }, {
        title: '日本',
        data: [],
        type: 8,
        bgc: 'linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)'
      }]
    }
  },
  watch: {
    // active 变化清空数据
    active: {
      handler (val, oldV) {
        this.sum = 0
        this.finish = false
        this.songList = []
        // 首次需要加载
        if (this.getData[val].data.length === 0) {
          this.loading = true
          // 推荐新歌根据active
          this.getNewSongs(this.getData[val].type)
        } else {
          const data = this.getData[val].data
          this.songListAll = data
          this.trackCount = data.length
          this.division()
        }
      },
      immediate: true
    }
  },
  methods: {
    getNewSongs (type) {
      newSongs(type)
        .then(data => {
          this.getData[this.active].data = data.data
          this.songListAll = data.data
          this.trackCount = data.data.length
          this.division()
        })
        .catch(() => {
          this.$toast('获取新歌失败')
        })
    }
  },
  components: {
    DefaultNav,
    PubcliSticky
  }
}
</script>
<style lang='scss' scoped>
.song-title {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 45vh;
  padding-top: .4rem;
  .mask {
    position: fixed;
    top: 1.93rem;
    z-index: 5;
    width: 100%;
    height: .5rem;
    // 谷歌空白会有边框
    &::after {
      content: '.';
      opacity: 0;
    }
  }
  .title {
    margin-left: .2rem;
    color: #fff;
    font-size: .5rem;
    font-weight: bold;
    letter-spacing: .1rem;
  }
}
</style>
