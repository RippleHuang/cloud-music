<template>
  <div class="artists">
    <div
      class="artists-for on-touch"
      v-for="(item, index) in data" :key="index"
      @click="goUserInfo(item.userId)"
    >
      <div class="img-info">
        <img v-lazy="(item.picUrl ? item.picUrl : item.img1v1Url ? item.img1v1Url : (item.coverUrl || item.avatarUrl)) + '?param=80y80'" alt />
      </div>
      <div class="info">
        <div class="name">
          <p class="van-ellipsis">
            {{ item.name || item.nickname }}
            <span v-if="(item.alias || {}).length > 0">({{item.alias[0]}})</span>
          </p>
          <i class="iconfont icon-nan" style="color: #6eccff;" v-if="item.gender === 1"></i>
          <i class="iconfont icon-nv" style="color: #fd79a8;" v-if="item.gender === 2"></i>
        </div>
        <div class="production">
          <span class="text" v-if="!user">专辑：{{item.albumSize}} </span>
          <span class="text" v-if="!user"> MV：{{item.mvSize}}</span>
          <span class="text van-ellipsis" :style="{display: user ? 'inline-block' : 'block'}" v-if="user">{{item.description || item.signature}}</span>
        </div>
      </div>
      <div class="artists-compile" @click.stop="no">
        <!-- 歌手 -->
        <span class="artist" v-if="songer">
          <i class="iconfont icon-yonghu"></i> 已入驻
        </span>
        <!-- 用户 -->
        <button class="add-button" v-if="user">
         <i class="iconfont icon-jia"></i> 关注
        </button>
        <!-- 收藏歌手 -->
        <i class="iconfont icon-sandian" v-if="favorite"></i>
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
    },
    user: {
      type: Boolean
    },
    songer: {
      type: Boolean
    },
    favorite: {
      type: Boolean
    }
  },
  methods: {
    goUserInfo (id) {
      if (this.user) {
        this.$router.push('/userinfo?accountUid=' + id)
      } else {
        this.$toast('尚未实装,敬请期待')
      }
    },
    no () {
      this.$toast('尚未实装,敬请期待')
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
      display: flex;
      width: 55vw;
      font-size: .32rem;
      color: black;
      line-height: 1.5;
      i {
        font-size: .22rem;
        margin-left: .1rem;
      }
    }
    .production {
      .text {
        width: 55vw;
        color: #999;
        font-size: .2rem;
        line-height: 1.5;
      }
    }
  }
  .artist {
    display: flex;
    align-items: center;
    font-size: .2rem;
    .icon-yonghu {
      margin-right: .15rem;
      color: #fff;
      background-color: #dd001b;
      border-radius: 50%;
    }
  }
  .icon-sandian {
    font-size: .33rem;
  }
  .add-button {
    width: 1.1rem;
    height: .4rem;
    color: #dd001b;
    font-size: .22rem;
    background-color: transparent;
    border: 0.01rem solid #dd001b;
    border-radius: 0.4rem;
    .icon-jia {
      font-size: .2rem;
    }
    &:active {
      color: #fff;
      background-color: #dd001b;
      border: none;
    }
  }
}
</style>
