<template>
  <!-- van-hairline--bottom 是vant提供的边框线 -->
  <div class="home-apply-container">
    <home-for :icons="homeAppIcons"/>
  </div>
</template>
<script>
import { HomeAppIcons } from 'getIcons/icons'
import HomeFor from 'components/HomeFor'
export default {
  name: 'HomeApply',
  props: {
    dj: {
      type: Number
    },
    favorite: {
      type: Number
    }
  },
  data () {
    return {
      homeAppIcons: []
    }
  },
  mounted () {
    this.homeAppIcons = HomeAppIcons()
  },
  activated () {
    this.homeAppIcons[3].num = this.dj
    this.homeAppIcons[4].num = this.favorite
  },
  components: {
    HomeFor
  }
}
</script>
<style lang='scss' scoped>
.home-apply-container {
  border-top: .01rem solid #eee;
  border-bottom: .18rem solid #eee;
}
</style>
