<template>
  <div class="ranking-list">
    <DefaultNav
      :title="'排行榜'"
      :background="'#dd001b'"
      :height="'1.2rem'"
      defaultShow
    />
    <loading :height="4.58" v-show="loading"/>
    <div class="ranking-box" v-show="!loading">
      <!-- 官方榜 -->
      <p class="ranking-title">官方榜</p>
      <!-- key重复 -->
      <div class="list on-touch"
        v-for="(rankingItem, index) in official" :key="index + '-only'"
        @click="$router.push(`/showsong?albumId=${rankingItem.id}`)"
      >
        <div class="img-info">
          <img v-lazy="rankingItem.coverImgUrl + '?param=150y150'" />
          <span class="time">{{ rankingItem.updateFrequency }}</span>
        </div>
        <div class="list-con">
          <div class="info van-ellipsis" v-for="(item, inx) in rankingItem.tracks" :key="inx">
            {{inx + 1 + '.'}}
            <span>{{item.first}}</span> -
            <span>{{item.second}}</span>
          </div>
        </div>
      </div>
      <!-- 其他榜单 -->
      <div class="ranking-for" v-for="(ranking, index) in rankingData" :key="index">
        <p class="ranking-title">{{ranking.title}}</p>
        <div class="song-list-con">
          <img-card
            v-for="(item, inx) in ranking.data" :key="inx"
            :imgUrl="item.coverImgUrl"
            :dec="item.name"
            :updateTime="item.updateFrequency"
            :playCount="item.playCount"
            @click.native="$router.push(`/showsong?albumId=${item.id}`)"
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
import { topList } from 'api/apis'
import { getRandomNumberArray } from 'utils/randomNumberArray'
export default {
  name: 'RankingList',
  data () {
    return {
      official: [],
      rankingData: [{
        data: [],
        title: '榜单推荐'
      }, {
        data: [],
        title: '更多榜单'
      }],
      loading: true
    }
  },
  created () {
    this.getTopList()
  },
  methods: {
    getTopList () {
      topList()
        .then(data => {
          this.official = data.list.slice(0, 4)
          // 随机3项
          this.rankingData[0].data = getRandomNumberArray(data.list, 3)
          this.rankingData[1].data = data.list.slice(4)
          this.$nextTick(() => {
            this.loading = false
          })
        })
        .catch(() => {
          this.$toast('获取排行榜失败')
        })
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
.ranking-box {
  padding-top: 1.4rem;
  .list {
    display: flex;
    align-items: center;
    padding: 0 .2rem;
    .img-info {
      position: relative;
      width: 31.5%;
      padding: .1rem 0;
      img {
        width: 100%;
        height: auto;
        border-radius: .1rem;
      }
      .time {
        position: absolute;
        left: .2rem;
        bottom: .3rem;
        font-size: .22rem;
        color: #fff;
      }
    }
    .info {
      width: 60vw;
      padding-left: .2rem;
      line-height: 2;
    }
  }
  .ranking-title {
    padding: .3rem .2rem;
    font-size: .34rem;
    color: black;
    font-weight: bold;
  }
  .song-list-con {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 .2rem;
  }
}

</style>
