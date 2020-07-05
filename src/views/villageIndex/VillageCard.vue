<template>
  <div class="village-box on-touch"  @click="$router.push(`/userInfo??accountUid=${userId}`)">
    <div class="image">
      <img v-lazy="imgUrl + '?param=200y250'" alt="">
    </div>
    <div class="content-info">
      <p class="text van-multi-ellipsis--l2">{{content}}</p>
      <div class="avatar-info">
        <img :src="avatar + '?param=50y50'" alt="">
        <span class="van-ellipsis">{{nickname}}</span>
        <span>{{likedCount | filterPlayCount}}赞<i class="iconfont icon-sandian"></i></span>
      </div>
    </div>
  </div>
</template>
<script>
import { filterPlayCount } from 'utils/filters'
export default {
  name: 'VillageCard',
  props: {
    content: {
      type: String
    },
    likedCount: {
      type: Number
    },
    nickname: {
      type: String
    },
    avatar: {
      type: String
    },
    imgUrl: {
      type: String
    },
    userId: {
      type: Number
    }
  },
  filters: {
    filterPlayCount
  }
}
</script>
<style lang='scss' scoped>
.village-box {
  width: 100%;
  margin: .2rem 0;
  break-inside: avoid;
  border-radius: .2rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, .15), 0 0 6px rgba(0, 0, 0, .05);
  .image {
    img {
      width: 100%;
      height: 4rem;
    }
  }
  .content-info {
    .text {
      margin: .15rem;
      color: black;
      font-size: .27rem;
      line-height: 1.2;
    }
    .avatar-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .1rem;
      img {
        width: .3rem;
        border-radius: 50%;
      }
      .van-ellipsis {
        width: 1.5rem;
      }
      .icon-sandian {
        font-size: .2rem;
      }
    }
  }
}
</style>
