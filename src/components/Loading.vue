<template>
  <div class="loading-svg">
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
  name: 'Loading'
}
</script>
<style lang='scss' scoped>
.loading-svg {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92.8%;
  box-sizing: border-box;
  .bar {
    display: flex;
    flex-flow: row nowrap;
    width: .7rem;
    height: .25rem;
    padding-top: .25rem;
    margin-bottom: .25rem;
    overflow: hidden;
    span {
      width: 0.07rem;
      height: .25rem;
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
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(2);
  }
}
</style>
