<template>
  <div class="list-all">
    <default-nav
      :title="nickname + '的歌单'"
      :background="'#dd001b'"
      defaultShow
    />
    <van-tabs
      v-model="active"
      swipeable
      title-active-color="#dd001b"
      line-width="1.4rem"
    >
      <van-tab
        v-for="inx in 2" :key="inx"
        :title="inx === 1 ? `创建的歌单${createNum - 1}` : `收藏的歌单${favoritesNum}`"
      >
        <ul class="song-group">
          <song-list-li
            v-for="(item, index) in inx === 1 ? createListAll : favoritesListAll" :key="index"
            :coverImgUrl="item.coverImgUrl"
            :name="item.name"
            :trackCount="item.trackCount"
            :creatorNickname="inx === 2 ? item.creator.nickname : ''"
            :privacy="item.privacy"
            :playCount="item.playCount"
            :bottom="0.17"
            userInfo
            @click.native="$router.push(`/showsong?albumId=${item.id}`)"
          />
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import DefaultNav from 'components/DefaultNav'
import SongListLi from 'components/SongListLi'
export default {
  name: 'ListAll',
  // 接受params数据
  props: {
    data: {
      type: String
    }
  },
  data () {
    return {
      active: 0,
      createNum: 0,
      favoritesNum: 0,
      createListAll: [],
      favoritesListAll: [],
      nickname: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 解码
      const dataParse = vm.$props.data ? JSON.parse(decodeURIComponent(vm.$props.data))
        : JSON.parse(decodeURIComponent(localStorage.getItem('data')))
      vm.$data.createNum = dataParse[0]
      vm.$data.favoritesNum = dataParse[1]
      vm.$data.createListAll = dataParse[2]
      vm.$data.favoritesListAll = dataParse[3]
      vm.$data.nickname = dataParse[4]
    })
  },
  created () {
    // 在页面刷新时将data保存到localStorage里
    window.addEventListener('beforeunload', () => {
      const dataParse = JSON.parse(decodeURIComponent(this.data))
      if (dataParse instanceof Array) {
        localStorage.setItem('data', this.data)
      }
    })
  },
  components: {
    DefaultNav,
    SongListLi
  }
}
</script>
<style lang='scss' scoped>
.list-all {
  padding-top: 1.2rem;
  .song-group {
    padding-top: .2rem;
    overflow-x: hidden;
  }
  h2 {
    margin: 0 0 .2rem .25rem;
    font-size: .35rem;
    color: black;
    span {
      font-size: .24rem;
      color: black;
    }
  }
}
</style>
