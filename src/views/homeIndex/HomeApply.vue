<template>
  <!-- van-hairline--bottom 是vant提供的边框线 -->
  <div class="home-apply-container">
    <ul class="item-list">
      <li v-for="(item, index) in HomeAppIcons" :key="index" class="home-apply-item on-touch">
        <i :class="item.icon" class="item-icon"></i>
        <div class="home-apply-content">
          <span class="item-text">{{item.text}}</span>
          <span class="item-num" ref="homeNum">({{item.num}})</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { HomeAppIcons } from 'getIcons/icons'
export default {
  name: 'HomeApply',
  data () {
    return {
      HomeAppIcons: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.HomeAppIcons = HomeAppIcons()
    }
  }
}
</script>
<style lang='scss' scoped>
.home-apply-container {
  border-top: .01rem solid #eee;
  border-bottom: .18rem solid #eee;
  .item-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .home-apply-item {
      display: flex;
      height: 1.1rem;
      .item-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1.5;
        font-size: .5rem;
        font-weight: 300;
      }
      // 调整第三个图标
      &:nth-of-type(3) {
        .item-icon {
          font-size: .42rem;
        }
      }
      // 最后一个无底边框
      &:last-of-type {
        .home-apply-content {
          border: none;
        }
      }
      .home-apply-content {
        display: flex;
        align-items: center;
        flex: 6;
        height: 1.1rem;
        border-bottom: .01rem solid #eee;
        .item-text {
          font-size: .3rem;
        }
        .item-num {
          margin-left: .1rem;
          color: rgba(0, 0, 0, .4);
        }
      }
    }
  }
}
</style>
