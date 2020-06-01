<template>
  <div class="popup-container">
    <div class="header">
      <div class="mask"></div>
      <div class="header-content">
        <p>登录网易云音乐</p>
        <p>手机电脑多端同步，尽享海量高品质音乐</p>
        <van-button class="title-btn" round type="info">立即登录</van-button>
      </div>
      <div class="card">
        c
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LeftPopup'
}
</script>
<style lang='scss' scoped>
.popup-container {
  width: 100%;
  height: 100vh;
  .header {
    position: relative;
    display: flex;
    justify-content: center;
    height: 4.5rem;
    .mask {
      position: absolute;
      top: 0;
      z-index: -3;
      width: 100%;
      height: 112%;
      background:  #f3f3f3;
    }
    &-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      line-height: .5rem;
      font-size: .24rem;
      color: rgb(99, 97, 97);
      .title-btn {
        width: 2.5rem;
        height: .6rem;
        padding: 0 .5rem;
        margin-top: .45rem;
        font-size: 4vw;
        color: rgb(112, 111, 111);
        background-color: #f3f3f3;
        border: .02rem solid #aaa;
        &:active {
          border: none;
          color: black;
        }
      }
    }
    .card {
      position: absolute;
      top: 4.5rem;
      display: flex;
      justify-content: center;
      width: 88%;
      height: 1.4rem;
      background: linear-gradient(to right, #0c0c0c 0%, #444444 100%);
      border-radius: .1rem;
    }
  }
}
</style>
