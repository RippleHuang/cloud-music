<template>
  <div class="opacity-card">
    <default-nav
      :title="nickName"
      :background="isFixed ? `url(${coverImgUrl})`: 'transparent'"
      :isFixed="isFixed"
      :height="'1.6rem'"
      share
    />
    <div class="body" :style="{ opacity }" @click="bgcPreview">
      <div class="left-con">
        <img class="account-bgi" v-show="loading" :src="avatarUrl" @click.stop="avaPreview" />
        <div class="information">
          <span class="account-nickname">{{nickName}}</span>
          <div class="relation">
            <span>关注 {{newFollows}}</span>
            <span class="line">|</span>
            <span>粉丝 {{followeds}}</span>
          </div>
          <div class="info">
            <span class="age"
              :style="{ background: gender === 1 ? 'rgba(104, 125, 194, 0.8)':'rgba(255, 119, 165, 0.8)' }"
              v-if="birthday > 0"
            >
              <i class="iconfont icon-nan" style="color: #6eccff;" v-if="gender === 1"></i>
              <i class="iconfont icon-nv" style="color: #fd79a8;" v-else></i>
              {{ birthday | filterAge }}后
            </span>
            <span class="lv">Lv.{{level}}</span>
          </div>
        </div>
      </div>
      <div class="right-btn" v-if="$store.state.nickName === nickName">
        <button class="compile" @click.stop="noAchieve">编辑</button>
        <button class="changebgc" @click.stop="noAchieve">更换背景</button>
      </div>
      <div class="right-btn" v-else>
        <button class="compile" style="background: #dd001b;" @click.stop="noAchieve">
          <i class="iconfont icon-jia"></i> 关注
        </button>
        <button class="changebgc" @click.stop="noAchieve">
          <i class="iconfont icon-email"></i> 发私信
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { filterAge } from 'utils/filters'
import DefaultNav from 'components/DefaultNav'
import { ImagePreview } from 'vant'
export default {
  name: 'OpacityCard',
  props: {
    isFixed: {
      type: Boolean
    },
    opacity: {
      type: Number
    },
    loading: {
      type: Boolean
    },
    followeds: {
      type: Number
    },
    newFollows: {
      type: Number
    },
    gender: {
      type: Number
    },
    birthday: {
      type: Number
    },
    coverImgUrl: {
      type: String
    },
    avatarUrl: {
      type: String
    },
    level: {
      type: Number
    },
    nickName: {
      type: String
    }
  },
  methods: {
    rollback () {
      this.$router.go(-1)
    },
    noAchieve () {
      this.$toast('此功能尚未开通, 敬请期待')
    },
    // 预览背景
    bgcPreview () {
      ImagePreview({ images: [this.coverImgUrl], closeable: true })
    },
    // 预览头像
    avaPreview () {
      ImagePreview({ images: [this.avatarUrl], closeable: true })
    }
  },
  filters: {
    filterAge
  },
  components: {
    DefaultNav
  }
}
</script>
<style lang='scss' scoped>
.opacity-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: .4rem;
  .body {
    display: flex;
    justify-content: space-between;
    width: 92.8%;
    margin-top: .6rem;
    .left-con {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 2;
      // 用户头像
      .account-bgi {
        width: 1.35rem;
        height: 1.35rem;
        border-radius: 50%;
      }
      // 用户信息
      .information {
        display: flex;
        flex-direction: column;
        flex: 1;
        color: #fff;
        .account-nickname {
          margin: .3rem 0;
          font-size: .38rem;
          letter-spacing: -0.03rem;
        }
        .relation {
          padding-bottom: .3rem;
          .line {
            font-size: .24rem;
            margin: 0 .2rem;
            color: rgb(177, 169, 169);
          }
        }
        .info {
          display: flex;
          flex-direction: row;
          .age {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: .1rem;
            width: 1.3rem;
            height: .42rem;
            font-size: .22rem;
            border-radius: .2rem;
            i {
              font-size: .22rem;
              margin-right: .1rem;
            }
          }
          .lv {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1rem;
            height: .42rem;
            font: {
              size: .22rem;
              weight: bold;
              style: italic;
            }
            background-color: rgba(194, 185, 185, 0.7);
            border-radius: .2rem;
          }
        }
      }
    }
    .right-btn {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      .compile {
        @extend .changebgc;
        margin-right: .1rem;
      }
      .changebgc {
        padding: .15rem .25rem;
        color: #fff;
        font-size: .22rem;
        box-sizing: border-box;
        background-color: rgb(214, 202, 202, .6);
        border-radius: .3rem;
        border: none;
        &:active {
           background-color: rgba(233, 227, 227, 0.8);
        }
        i {
          font-size: .2rem;
        }
      }
    }
  }
}
</style>
