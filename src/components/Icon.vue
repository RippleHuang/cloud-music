<template>
  <div class="icon-list" :class="{compile}">
    <div class="icon-con">
      <i :class="icons.icon"></i>
    </div>
    <span class="icon-text">{{icons.text}}</span>
  </div>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    icons: {
      type: [Object, Array]
    },
    compile: {
      type: Boolean
    }
  }
}
</script>
<style lang="scss" scopd>
// 我的页面编辑图标
.compile {
  &:last-of-type > .icon-con {
    color: #ccc;
    background: #f5f6f8;
  }
}
.icon-list {
  // 列方式排列
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  .icon-con {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    margin-bottom: .25rem;
    background: linear-gradient(to right, #fc4f3c, #df4337);
    color: #fff;
    border-radius: 50%;
    i {
      font-size: 6.5vw;
    }
  }
  .icon-text {
    color: rgba(0, 0, 0, .7);
    font-size: .21rem;
  }
}
</style>
