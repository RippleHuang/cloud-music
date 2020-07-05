<template>
  <div class="new-plate">
    <DefaultNav
      :title="'新碟上架'"
      :background="'#dd001b'"
      :height="'1.2rem'"
      defaultShow
    />
    <loading :height="4.58" v-show="loading"/>
    <!-- 新碟列表 -->
    <div class="new-plate-box" v-show="!loading">
      <div class="new-plate-item" v-for="(plate, index) in filterAlbums" :key="index">
        <p class="plate-title">
          <span v-show="index === 0">本周新碟</span>
          <span class="month" v-show="index !== 0">
            {{new Date().getMonth() + 2 - index}}月
          </span>
          <span class="year" v-show="index !== 0">/{{new Date().getFullYear()}}</span>
        </p>
        <div class="song-list-con">
          <img-card
            v-for="(item, inx) in plate.data"
            :key="inx"
            :imgUrl="item.picUrl"
            :dec="item.name"
            :playCount="item.playCount"
            @click.native="$router.push(`/showsong?dishId=${item.id}`)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DefaultNav from 'components/DefaultNav'
import Loading from 'components/Loading'
import ImgCard from 'components/ImgCard'
import { newDish } from 'api/apis'
export default {
  name: 'MoreNewPlate',
  data () {
    return {
      filterAlbums: [{
        data: [],
        title: '本周新碟'
      }, {
        data: []
      }, {
        data: []
      }],
      loading: true
    }
  },
  created () {
    // 获取要请求的个数
    // const limit = this.$route.query.total
    this.getNewDish('240')
  },
  methods: {
    getNewDish (limit) {
      newDish(limit)
        .then(data => {
          // 根据publishTime排序 倒序
          const albums = data.albums.sort((a, b) => b.publishTime - a.publishTime)
          this.filterData(albums)
          this.$nextTick(() => {
            this.loading = false
          })
        })
        .catch(() => {
          this.$toast('获取新碟失败')
        })
    },
    // 根据日期分割数据
    filterData (arr) {
      // 获取星期一
      const date = new Date()
      const week = date.getDay()
      const monday = date.getTime() - ((week - 1) * 24 * 60 * 60 * 1000)
      // 本周数据
      this.filterAlbums[0].data = arr.filter(val => val.publishTime >= monday)
      // 本月
      const month = date.getMonth() + 1
      // 这个月和上个月数据
      for (let i = 0; i <= 1; i++) {
        this.filterAlbums[i + 1].data = arr.filter(val => new Date(val.publishTime).getMonth() + 1 === month - i)
      }
    },
    onLoad () {
    }
  },
  components: {
    DefaultNav,
    Loading,
    ImgCard
  }
}
</script>
<style lang='scss' scoped>
.new-plate-box {
  padding: 1.4rem .2rem 0;
  .plate-title {
    padding: .3rem 0;
    font-size: .34rem;
    color: black;
    font-weight: bold;
    .month {
      font-size: .42rem;
    }
    .year {
      color: rgb(148, 142, 142);
    }
  }
  .song-list-con {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

</style>
