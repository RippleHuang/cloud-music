<template>
  <div class="icon-list">
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
    }
  }
}
</script>
<style lang="scss" scopd>
.icon-list {
  .icon-con {
    display: flex;
    justify-content: center;
    align-items: center;
    width: .75rem;
    height: .75rem;
    margin-bottom: .05rem;
    background: linear-gradient(to right, #ff1d11, #dd001b);
    color: #fff;
    border-radius: 50%;
    i {
      font-size: 5vw;
    }
  }
  .icon-text {
    text-align: center;
    font-size: 0.17rem;
  }
}
</style>
