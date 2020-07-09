<template>
  <div class="my-favorite">
    <default-nav
      :title="'我的收藏'"
      :background="'#dd001b'"
      defaultShow
    />
    <van-tabs
      v-model="active"
      swipeable
      class="nav-tabs"
      line-width="0.6rem"
      color="#fff"
      background="#dd001b"
    >
      <van-tab
        class= "nav-tab"
        v-for="(item, index) in getData"
        :key="index"
      >
        <template #title>{{item.title}}<span class="size">{{item.count}}</span></template>
        <loading :height="2.35" v-show="loading" />
        <public-page :data="item.data" :active="active" v-show="!loading" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import DefaultNav from 'components/DefaultNav'
import PublicPage from './myfavorite/PublicPage'
import Loading from 'components/Loading'
import { favoriteAlbums, favoriteArtists, favoriteVideos } from 'api/apis'
export default {
  name: 'MyFavorite',
  data () {
    return {
      active: 0,
      loading: true,
      getData: [{
        title: '专辑',
        data: [],
        count: 0
      }, {
        title: '歌手',
        data: [],
        count: 0
      }, {
        title: '视频',
        data: [],
        count: 0
      }, {
        title: '专栏',
        data: []
      }, {
        title: 'Mlog',
        data: []
      }]
    }
  },
  created () {
    this.getArtists()
    this.getVideos()
    this.getAlbums()
  },
  watch: {
    '$store.state.refreshState': {
      handler (val, oldVal) {
        this.getAlbums()
      }
    }
  },
  methods: {
    getAlbums () {
      favoriteAlbums()
        .then(data => {
          this.getData[0].data = data.data
          this.getData[0].count = data.count
          // 保存专辑 id
          // 有本地数据先清空
          if (localStorage.getItem('albumsId')) localStorage.removeItem('albumsId')
          const albumsId = [];
          (data.data).forEach(element => {
            albumsId.push(element.id)
          })
          // 保存
          localStorage.setItem('albumsId', JSON.stringify(albumsId))
          this.$nextTick(() => {
            this.loading = false
          })
        })
        .catch(() => {
          this.$toast('获取专辑失败')
        })
    },
    getArtists () {
      favoriteArtists()
        .then(data => {
          this.getData[1].data = data.data
          this.getData[1].count = data.count
        })
        .catch(() => {
          this.$toast('获取歌手失败')
        })
    },
    getVideos () {
      favoriteVideos()
        .then(data => {
          this.getData[2].data = data.data
          this.getData[2].count = data.count
        })
        .catch(() => {
          this.$toast('获取视频失败')
        })
    }
  },
  components: {
    DefaultNav,
    PublicPage,
    Loading
  }
}
</script>
<style lang='scss' scoped>
.my-favorite {
  padding-top: 1.2rem;
  .nav-tabs {
    .size {
      position: absolute;
      left: 110%;
      font-size: .22rem;
      color: rgb(238, 236, 236);
    }
  }
}
</style>
