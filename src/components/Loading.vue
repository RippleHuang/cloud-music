<template>
  <div class="loading-svg" :style="{ 'height':`${height}rem`, 'position': `${isabsolute ? 'absolute': 'relative'}`, 'padding-bottom': `${height -2}rem`}">
    <div class="bar">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    努力加载中...
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    height: {
      type: Number
    },
    isabsolute: {
      type: Boolean
    }
  }
}
</script>
<style lang='scss' scoped>
.loading-svg {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  width: 100%;
  border-radius: .4rem .4rem 0 0;
  .bar {
    display: flex;
    justify-content: center;
    flex-flow: row nowrap;
    width: .9rem;
    height: .5rem;
    margin-top: .16rem;
    span {
      width: 0.08rem;
      height: .5rem;
      margin-left: .075rem;
      background-color: #dd001b;
    }
    span:nth-of-type(1) {
      animation: grow 1s -0.45s ease-in-out infinite;
    }
    span:nth-of-type(2) {
      animation: grow 1s ease-in-out infinite;
    }
    span:nth-of-type(3) {
      animation: grow 1s -0.45s ease-in-out infinite;
    }
    span:nth-of-type(4) {
      animation: grow 1s ease-in-out infinite;
    }
  }
}
@keyframes grow {
  0%,
  100% {
    height: .3rem;
  }

  50% {
    height: .5rem;
    margin-top: -0.2rem;
  }
}
</style>
