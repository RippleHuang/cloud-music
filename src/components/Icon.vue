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
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  .icon-con {
    display: flex;
    justify-content: center;
    align-items: center;
    width: .9rem;
    height: .9rem;
    margin-bottom: .25rem;
    background: linear-gradient(to right, #fc4f3c, #df4337);
    color: #fff;
    border-radius: 50%;
    i {
      font-size: 6vw;
    }
  }
  .icon-text {
    color: rgba(0, 0, 0, .7);
    font-size: .21rem;
  }
}
</style>
