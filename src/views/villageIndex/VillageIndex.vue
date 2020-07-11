<template>
  <div class="village">
    <!-- 选项卡 -->
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
        title="广场"
      >
        <loading :height="6.58" :position="'relative'" v-show="!load" />
        <div class="card-box" v-show="load">
          <village-card
            v-for="(item, index) in hotwall" :key="index"
            :content="item.content"
            :likedCount="item.likedCount"
            :nickname="item.simpleUserInfo.nickname"
            :avatar="item.simpleUserInfo.avatar"
            :imgUrl="item.simpleResourceInfo.songCoverUrl"
            :userId="item.simpleUserInfo.userId"
          />
        </div>
      </van-tab>
      <!-- 动态 -->
      <van-tab
        class= "nav-tab"
        title="动态"
      >
        <div class="village-event" v-if="$store.state.loginState">
          <!-- 瀑布流加载 -->
          <van-list
            v-model="reload"
            :finished="finished"
            :finished-text="'没有更多了'"
            :offset="50"
            @load="onLoad"
          >
            <dynamic-card
              :dataMsg="eventAll"
              :loading="loading"
            />
            <!-- vant list插槽 -->
            <template #loading>
              <loading :height="1.5" v-show="reload"/>
            </template>
          </van-list>
        </div>
        <div class="empty" v-else>
          <i class="iconfont icon-kong"></i>
          <p>需要登录</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import VillageCard from './VillageCard'
import Loading from 'components/Loading'
import DynamicCard from 'components/DynamicCard'
import { hotwallVillage, eventVillage } from 'api/apis'
export default {
  name: 'VillageIndex',
  data () {
    return {
      active: 0,
      hotwall: [],
      event: [],
      eventAll: [],
      lasttime: 0, // 下一页
      // 两个item加载
      load: false,
      loading: false,
      // 瀑布加载
      reload: false,
      finished: false
    }
  },
  created () {
    this.getHotwallVillage()
  },
  methods: {
    getHotwallVillage () {
      hotwallVillage()
        .then(data => {
          this.hotwall = data.data
          this.$nextTick(() => {
            this.load = true
          })
        })
        .catch(() => {
          this.$toast('获取热评失败')
        })
    },
    // 30个为一组
    getEventVillage (lasttime) {
      eventVillage(30, lasttime)
        .then(data => {
          this.event = data.event
          this.lasttime = data.lasttime
          // 没有数据时停止
          if (this.event.length === 0) {
            this.finished = true
            this.loading = true
            this.reload = false
          } else {
            this.division()
          }
        })
        .catch(() => {
          this.$toast('获取动态失败')
        })
    },
    division () {
      this.eventAll.push(...this.event)
      this.$nextTick(() => {
        // reload 需要放在$nextTick中
        this.loading = true
        // 加载状态结束
        this.reload = false
      })
    },
    onLoad () {
      if (this.$store.state.loginState) {
        this.getEventVillage(this.lasttime)
      } else {
        this.$toast('需要登录')
      }
    }
  },
  components: {
    VillageCard,
    Loading,
    DynamicCard
  }
}
</script>
<style lang="scss" scoped>
// 两竖列
.card-box {
  position: relative;
  // 使用这种方式
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 92.8%;
  margin: 0 auto;
  // 不兼容
  // column-count: 2;
}
.village-event {
  position: relative;
  // 固定高度,否则list无限load
  height: 100vh;
  overflow-y: scroll;
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 70%;
  text-align: center;
  font-size: .32rem;
  .icon-kong {
    margin-bottom: .4rem;
    color: #dd001b;
    font-size: 3rem;
    -webkit-text-stroke: 4px #fff;
  }
}
</style>
