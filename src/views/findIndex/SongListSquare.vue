<template>
  <div class="song-square">
    <default-nav
      :title="'歌单广场'"
      :background="'#dd001b'"
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
        <!-- 瀑布流加载 -->
        <van-list
          v-model="reload"
          :finished="finished"
          :finished-text="'没有更多了'"
          :offset="100"
          @load="onLoad"
        >
          <!-- 歌单列表 -->
          <loading :height="4.58" v-show="loading"/>
          <div class="song-list-con" v-show="!loading">
            <img-card
              v-for="(item, inx) in data.data"
              :key="inx"
              :imgUrl="item.coverImgUrl"
              :dec="item.name"
              :playCount="item.playCount"
              @click.native="$router.push(`/showsong?albumId=${item.id}`)"
            />
          </div>
          <!-- vant list插槽 -->
          <template #loading>
            <loading :height="0.5" v-show="reload"/>
          </template>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import DefaultNav from 'components/DefaultNav'
import Loading from 'components/Loading'
import ImgCard from 'components/ImgCard'
import { recSongList, highQuality } from 'api/apis'
export default {
  name: 'SongListSquare',
  data () {
    return {
      active: 0,
      // 加载相关
      loading: true,
      reload: false,
      finished: false,
      // 歌单相关
      songList: [],
      lasttime: 0, // 精品下一页
      total: 0, // 总数
      getData: [{
        title: '推荐',
        data: [],
        cat: '全部',
        sum: -1 // 页数, 一进入页面会触发 onLoad,所以从-1开始
      }, {
        title: '精品',
        data: [],
        cat: '全部'
      }, {
        title: '华语',
        data: [],
        cat: '华语',
        sum: -1
      }, {
        title: 'ACG',
        data: [],
        cat: 'ACG',
        sum: -1
      }, {
        title: '轻音乐',
        data: [],
        cat: '轻音乐',
        sum: -1
      }, {
        title: '电子',
        data: [],
        cat: '电子',
        sum: -1
      }, {
        title: '古风',
        data: [],
        cat: '古风',
        sum: -1
      }]
    }
  },
  watch: {
    // active 变化清空数据
    active: {
      handler () {
        this.finished = false
        this.songList = []
        // 首次需要加载
        if (this.getData[this.active].data.length === 0) {
          this.loading = true
        }
      }
    }
  },
  methods: {
    getRecSongList (limit, cat, offset) {
      recSongList(limit, cat, offset)
        .then(data => {
          this.songList = data.playlists
          this.total = data.total
          this.division()
        })
        .catch(() => {
          this.$toast('获取推荐歌单失败')
        })
    },
    getHighQuality (limit, before, cat) {
      highQuality(limit, before, cat)
        .then(data => {
          this.songList = data.playlists
          this.lasttime = data.lasttime
          this.total = data.total
          this.division()
        })
        .catch(() => {
          this.$toast('获取精品歌单失败')
        })
    },
    // 30个为一组
    division () {
      // 对应active
      this.getData[this.active].data.push(...this.songList)
      // 加载状态结束
      this.$nextTick(() => {
        this.loading = false
        this.reload = false
      })
      // 数据全部加载完成
      if (this.getData[this.active].data.length >= this.total) {
        this.finished = true
      }
    },
    onLoad () {
      if (this.active !== 1) {
        this.getData[this.active].sum++
        // 推荐歌单以及其他分类
        this.getRecSongList(30, this.getData[this.active].cat, this.getData[this.active].sum * 30)
      } else {
        // 精品歌单
        this.getHighQuality(30, this.lasttime, this.getData[1].cat)
      }
    }
  },
  components: {
    DefaultNav,
    ImgCard,
    Loading
  }
}
</script>
<style lang='scss' scoped>
.song-list-con {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1.4rem .2rem 0;
}
</style>
