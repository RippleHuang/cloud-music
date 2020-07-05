<template>
  <div class="dynamic">
    <loading :height="4.58" v-show="!loading" />
    <dynamic-card
      :dataMsg="dataMsg"
      :loading="loading"
    />
    <van-pagination
      v-show="loading"
      v-model="currentPage"
      :page-count="pageNum"
      mode="simple"
      @change="nextOrpre"
    />
  </div>
</template>
<script>
import { userEvent } from 'api/apis'
import Loading from 'components/Loading'
import DynamicCard from 'components/DynamicCard'
export default {
  name: 'UserDynamic',
  props: {
    refresh: {
      type: Number
    },
    avatarUrl: {
      type: String
    },
    accountUid: {
      type: Number
    },
    nickName: {
      type: String
    }
  },
  data () {
    return {
      dataMsg: [],
      lasttime: -1,
      nexttime: 0,
      currentPage: 1,
      pageNum: 0,
      next: false,
      loading: false
    }
  },
  watch: {
    // 更新
    refresh: {
      handler (newV, old) {
        this.loading = false
        this.getUserEvent(this.accountUid)
      },
      immediate: true
    },
    // 下一页
    lasttime: {
      handler (newV, old) {
        if (this.next) {
          this.getUserEvent(this.accountUid, newV)
          this.next = false
        }
      }
    }
  },
  methods: {
    // 获取用户动态
    getUserEvent (id, lasttime) {
      userEvent(id, 30, lasttime)
        .then(data => {
          this.dataMsg = data.events
          this.nexttime = data.lasttime
          this.pageNum = Math.ceil(data.size / 30)
          this.$nextTick(() => {
            this.loading = true
          })
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    // 下一页
    nextOrpre () {
      this.next = true
      this.loading = false
      this.lasttime = this.nexttime
      // 到达顶部
      window.scrollTo(0, 0)
    }
  },
  components: {
    Loading,
    DynamicCard
  }
}
</script>
<style lang='scss' scoped>

</style>
