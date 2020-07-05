<template>
<div class="find-icon-content">
  <div class="find-icon-list">
    <icon
      v-for="(item, index) in findIcons" :key="index"
      :icons="item"
      @click.native="forEvent(item.event)"
    />
  </div>
</div>
</template>
<script>
import Icon from 'components/Icon'
import { FindIcons } from 'getIcons/icons'
import { personalFm } from 'api/apis'
export default {
  name: 'FindIcons',
  data () {
    return {
      findIcons: []
    }
  },
  mounted () {
    this.findIcons = FindIcons()
  },
  methods: {
    forEvent (event) {
      this[event]()
    },
    no () {
      this.$toast('该功能尚未完成,敬请期待')
    },
    goRecommend () {
      this.$router.push('/recommend')
    },
    moreSonglist () {
      this.$router.push('/songlistsquare')
    },
    goRankingList () {
      this.$router.push('/rankinglist')
    },
    goPersonalFm () {
      personalFm()
        .then(data => {
          const list = data.data
          this.$store.dispatch('startPlayAll', { list })
        })
        .catch(() => {
          this.$toast('获取私人fm失败')
        })
    }
  },
  components: {
    Icon
  }
}
</script>
<style lang="scss" scoped>
.find-icon-content {
  display: flex;
  justify-content: center;
  width: 100%;
  .find-icon-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 92.8%;
    height: 1.8rem;
    padding: .3rem 0;
  }
}
</style>
