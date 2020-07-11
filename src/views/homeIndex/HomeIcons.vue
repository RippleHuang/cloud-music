<template>
  <div class="home-icons-content">
    <ul class="icons-group">
      <!-- compile 等价于 :compile="true" -->
      <li
        v-for="(item, index) in HomeIcons"
        :icons="item"
        :key="index"
        compile
        is="icon"
        class="home-icon-list"
        @click.native="noAction"
      >
      </li>
    </ul>
  </div>
</template>
<script>
import Icon from 'components/Icon'
import { HomeIcons } from 'getIcons/icons'
export default {
  name: 'HomeIcons',
  data () {
    return {
      HomeIcons
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.HomeIcons = HomeIcons()
    },
    noAction () {
      this.$toast('该功能尚未实装,敬请期待')
    }
  },
  components: {
    Icon
  }
}
</script>
<style lang='scss' scoped>
.home-icons-content {
  overflow-x: scroll;
  // 隐藏滚动条 火狐 IE 谷歌
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  .icons-group {
    display: flex;
    align-items: center;
    width: fit-content;
    height: 1.6rem;
    padding: .4rem 0;
    .home-icon-list {
      width: 1rem;
      margin-left: .52rem;
      &:first-of-type {
        margin-left: .25rem;
      }
      &:last-of-type {
        padding-right: .25rem;
      }
    }
  }
}
</style>
