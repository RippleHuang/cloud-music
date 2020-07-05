<template>
  <div class="recommend">
    <DefaultNav
      :title="'每日推荐'"
      :background="'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)'"
      :height="opacity < 0.2 ? '1.6rem' : '1.2rem'"
      :isFixed="isFixed"
    />
    <div class="data-content">
      <div class="date">
        <span class="day">{{new Date().getDate()| supplement}}</span>
        <span class="month">/{{new Date().getMonth() + 1 | supplement}}</span>
      </div>
      <p class="title">今日推荐</p>
    </div>
    <pubcli-sticky
      show
      recommend
      :loading="loading"
      :songList="songList"
      :songListAll="songListAll"
      :load="load"
      :finish="finish"
      :newAndrecommed="'0 0.2rem 0 0.25rem'"
      :top="'4.2rem'"
      @reLoad="onLoad"
    />
  </div>
</template>
<script>
import PubcliSticky from 'components/PubcliSticky'
import DefaultNav from 'components/DefaultNav'
import { listRefresh, scroll } from '@/mixins/mixins'
import { recSongs } from 'api/apis'
export default {
  name: 'Recommend',
  mixins: [listRefresh, scroll],
  activated () {
    this.getRecSongs()
  },
  methods: {
    getRecSongs () {
      recSongs()
        .then(data => {
          this.songListAll = data.data.dailySongs
          this.division()
        })
        .catch(() => {
          this.$toast('获取歌曲失败')
        })
    }
  },
  filters: {
    supplement (nn) {
      nn = nn < 10 ? '0' + nn : nn
      return nn
    }
  },
  components: {
    DefaultNav,
    PubcliSticky
  }
}
</script>
<style lang='scss' scoped>
.recommend {
  height: 40vh;
  .data-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 4.2rem;
    padding: .4rem .2rem 0;
    background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
    .date {
      .day {
        color: #fff;
        font-size: .52rem;
      }
      .month {
        color: #eee;
        font-size: .32rem;
      }
    }
    .title {
      width: 1.2rem;
      padding: .1rem .2rem;
      margin-top: .2rem;
      background-color: #eee;
      border-radius: .2rem;
    }
  }
}
</style>
