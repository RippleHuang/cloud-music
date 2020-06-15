<template>
  <div class="nav-con">
    <div class="default-nav" :style="{ background, height }">
      <div class="left">
        <i class="iconfont icon-zuo"  @click="rollback"></i>
        <span v-if="defaultShow">{{title}}</span>
        <span v-show="isFixed">{{title}}</span>
      </div>
      <i v-if="share" @click="showShare = true" class="iconfont icon-fenxiang"></i>
    </div>
    <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      />
  </div>
</template>
<script>
export default {
  name: 'DefaultNav',
  props: {
    title: {
      type: String
    },
    defaultShow: {
      type: Boolean
    },
    background: {
      type: String
    },
    share: {
      type: Boolean
    },
    isFixed: {
      type: Boolean
    },
    height: {
      type: String
    }
  },
  data () {
    return {
      showShare: false,
      options: [
        [
          { name: '复制链接', icon: 'link' },
          { name: '二维码', icon: 'qrcode' }
        ],
        [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ]
      ]
    }
  },
  methods: {
    rollback () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='scss' scoped>
.nav-con {
  width: 100%;
  height: 0;
  .default-nav {
    position: fixed;
    top: 0;
    z-index: 5;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 1.2rem;
    padding: 0 .2rem;
    box-sizing: border-box;
    line-height: 1.2rem;
    color: #fff;
    font-size: .42rem;
    .left {
      i {
        display: inline-block;
        height: 1.2rem;
        padding-right: .4rem;
        font-size: .42rem;
      }
      span {
        font-size: .36rem;
      }
    }
    .icon-fenxiang {
      font-size: .42rem;
    }
  }
}
</style>
