<template>
  <div class="artists">
    <div class="artists-for on-touch" @click="no" v-for="(item, index) in data" :key="index">
      <div class="img-info">
        <img v-lazy="(item.picUrl ? item.picUrl : item.coverUrl) + '?param=80y80'" alt />
      </div>
      <div class="info">
        <p class="name">{{ item.name }}</p>
        <div>
          <span class="artist">专辑：{{item.albumSize}}</span>
          <span class="text">MV：{{item.mvSize}}</span>
        </div>
      </div>
      <div class="artists-compile">
        <i class="iconfont icon-sandian"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArtistsOrUser',
  props: {
    data: {
      type: Array
    }
  }
}
</script>
<style lang='scss' scoped>
.artists-for {
  display: flex;
  align-items: center;
  padding: .1rem .3rem;
  .img-info {
    width: 1rem;
    height: 1rem;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: .2rem;
    .name {
      font-size: .32rem;
      color: black;
    }
    .name,
    .artist,
    .text {
      line-height: 1.5;
    }
    .artist,
    .text {
      color: #999;
      font-size: .2rem;
    }
  }
  .icon-sandian {
    font-size: .33rem;
  }
}
</style>
