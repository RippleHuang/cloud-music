<template>
  <div class="my-radio">
    <default-nav
      :title="'我的电台'"
      :background="'#dd001b'"
      defaultShow
    />
    <div class="container" v-show="show">
      <loading :height="2.35" v-show="loading" />
      <div class="con" v-show="!loading">
        <h2>我订阅的电台 <span>({{count}})</span></h2>
        <div class="radio-for on-touch" v-for="(item, index) in data" :key="index">
          <div class="img-info">
            <img v-lazy="item.picUrl + '?param=100y100'" alt />
          </div>
          <div class="info">
            <p class="name van-ellipsis">{{ item.name }}</p>
            <p class="artist van-ellipsis">by {{item.dj.nickname}}</p>
            <p class="text van-ellipsis">{{item.lastProgramName}}</p>
          </div>
          <div class="radio-compile">
            <i class="iconfont icon-sandian"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="empty" v-show="!show">
      <i class="iconfont icon-kong"></i>
      <p>暂无内容</p>
    </div>
  </div>
</template>
<script>
import DefaultNav from 'components/DefaultNav'
import Loading from 'components/Loading'
import { djSublist } from 'api/apis'
export default {
  name: 'MyRadio',
  data () {
    return {
      loading: true,
      data: [],
      count: 0,
      show: true
    }
  },
  created () {
    this.getDj()
  },
  activated () {
    this.show = true
  },
  methods: {
    getDj () {
      djSublist()
        .then(data => {
          if (data.count === 0) {
            this.show = false
          } else {
            this.data = data.djRadios
            this.count = data.count
            this.$nextTick(() => {
              this.loading = false
            })
          }
        })
        .catch(() => {
          this.$toast('获取电台失败')
        })
    }
  },
  components: {
    DefaultNav,
    Loading
  }
}
</script>
<style lang='scss' scoped>
.my-radio {
  padding-top: 1.2rem;
  h2 {
    margin: .2rem 0 .2rem .25rem;
    font-size: .35rem;
    color: black;
    span {
      font-size: .28rem;
      color: rgb(187, 184, 184);
    }
  }
  .radio-for {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .1rem .3rem;
    .img-info {
      width: 1.5rem;
      height: 1.5rem;
      img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: .1rem;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      width: 4.2rem;
      padding: 0 .15rem;
      .name {
        color: black;
        font-size: .3rem;
      }
      .artist, .text {
        padding-top: .1rem;
        font-size: .24rem;
        color: #aaa;
      }
    }
  }
  .empty {
    width: 100%;
    height: 70%;
    text-align: center;
    font-size: .32rem;
    .icon-kong {
      color: #dd001b;
      font-size: 3rem;
      -webkit-text-stroke: 4px #fff;
    }
  }
}
</style>
