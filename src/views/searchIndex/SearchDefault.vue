<template>
  <div class="search-default">
    <loading :height="4.58" v-show="loading" />
    <div class="search-container" v-show="!loading">
      <!-- 历史记录 -->
      <div class="history" v-if="$store.getters.searchHistory.length">
        <div class="top">
          <p class="title">历史记录</p>
          <i class="iconfont icon-trash" @click="$store.commit('CLEAR_HISTORY')"></i>
        </div>
        <div class="history-box">
          <ul class="tag-group">
            <li
              class="tags-item"
              v-for="(item, index) in $store.getters.searchHistory" :key="index"
              @click="goSearch(item)"
            >
              {{item}}
            </li>
          </ul>
        </div>
      </div>
      <!-- 热搜榜 -->
      <div class="hot-search">
        <p class="hot-title">热搜榜</p>
        <ul class="hot-group">
          <li
            class="hot-item on-touch"
            v-for="(item, index) in hotList" :key="index"
            @click="goSearch(item.searchWord)"
          >
            <span class="num">{{ index + 1 }}</span>
            <div class="song-center">
              <div class="song-info">
                <span>{{ item.searchWord }}</span>
                <img
                  class="search-logo"
                  :style="{width: item.iconType === 5 ? '0.25rem' : '0.45rem'}"
                  v-if="item.iconUrl"
                  :src="item.iconUrl"
                />
              </div>
              <p class="song-content">{{ item.content }}</p>
            </div>
            <span class="score">{{ item.score }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { hotSearchList } from 'api/apis'
import Loading from 'components/Loading'
export default {
  name: 'SearchDefault',
  data () {
    return {
      loading: true,
      hotList: []
    }
  },
  created () {
    this.getHotSearchList()
  },
  methods: {
    getHotSearchList () {
      hotSearchList()
        .then(data => {
          this.hotList = data.data
          this.$nextTick(() => {
            this.loading = false
          })
        })
        .catch(() => {
          this.$toast('获取热搜失败')
        })
    },
    // 去搜索页并保存历史记录
    goSearch (keyword) {
      this.$store.commit('SET_HISTORY', keyword)
      this.$router.push(`/searchresult?text=${keyword}`)
    }
  },
  components: {
    Loading
  }
}
</script>
<style lang='scss' scoped>
.search-default {
  padding-top: 1.2rem;
  .history {
    padding: .3rem .4rem 0;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: .8rem;
      .title {
        color: black;
        font-size: .32rem;
        font-weight: bold;
      }
      .icon-trash {
        color: rgb(136, 132, 132);
        font-size: .32rem;
      }
    }
    .history-box {
      overflow-x: auto;
      // 隐藏滚动条 火狐 IE 谷歌
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
      .tag-group {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        width: fit-content;
        .tags-item {
          display: flex;
          width: max-content;
          height: .6rem;
          padding: 0 .2rem;
          margin-right: .3rem;
          line-height: .6rem;
          text-align: center;
          color: black;
          background-color: rgb(236, 231, 231);
          border-radius: .3rem;
        }
      }
    }
  }
  .hot-search {
    margin-top: .8rem;
    .hot-title {
      margin-left: .4rem;
      font-size: .32rem;
      font-weight: bold;
    }
    .hot-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .4rem;
      color: #888;
      font-size: .24rem;
      @mixin hotpublic {
        .num {
          color: #dd001b;
        }
        .song-info {
          font-weight: bold;
          font-size: .34rem;
        }
      }
      &:nth-of-type(1) {
        @include hotpublic;
      }
      &:nth-of-type(2) {
        @include hotpublic;
      }
      &:nth-of-type(3) {
        @include hotpublic;
      }
      .num {
        width: .4rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: .35rem;
      }
      .song-center {
        width: 60vw;
        .song-info {
          padding: .1rem 0;
          color: black;
          font-size: .32rem;
          .search-logo {
            margin: -0.1rem 0 0 0.1rem;
          }
        }
      }
      .score {
        width: 1.2rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: .24rem;
      }
    }
  }
}
</style>
