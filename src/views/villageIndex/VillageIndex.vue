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
        <div class="village-event">
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
          this.division()
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
      // 数据全部加载完成
      if (this.eventAll >= 300) {
        this.finished = true
      }
    },
    onLoad () {
      this.getEventVillage(this.lasttime)
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
  width: 92.8%;
  margin: 0 auto;
  column-count: 2;
}
.village-event {
  position: relative;
  // 固定高度,否则list无限load
  height: 100vh;
}
</style>
