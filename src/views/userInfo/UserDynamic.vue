<template>
  <div class="dynamic">
    <loading :height="7.58" v-show="!loading" />
    <div class="dynamic-card van-hairline--bottom" v-for="(item, index) in dataMsg" :key="index">
      <div class="top">
        <div class="img-info">
          <img :src="avatarUrl" alt />
        </div>
        <div class="author">
          <h1 class="nickname">
            {{nickName}}
            <span class="category">{{item.type.type}}</span>
          </h1>
          <span class="time">{{item.time | filterSetDate}}</span>
        </div>
      </div>
      <div class="content">
        <h1 class="msg" v-if="item.msg">{{item.msg}}</h1>
        <!-- 用户发的图片,需要循环得到,没有不显示此节点 -->
        <div class="image" v-for="(img, index1) in item.pics" :key="index1">
          <img :src="img.originUrl" alt="">
        </div>
        <!-- 转发样式需修改 -->
        <div class="container-share" :style="{padding: item.msgs ? '.2rem .1rem .1rem': '0'}">
          <p class="share-msg" v-if="item.msgs">
            <span class="share-name">@{{item.event.user.nickname}}</span>
            :{{item.msgs}}
          </p>
          <!-- 视频 -->
          <div class="viedo-img"
            v-if="item.type.type === '分享视频:' ||
                  item.type.type === '发布视频:' ||
                  item.typeNum === 21 ||
                  item.typeNum === 41 ||
                  item.typeNum === 39"
          >
            <img :src="item.img" alt="">
            <div class="mask"></div>
            <span class="playtime">
              <i class="iconfont icon-gedanbofangliang_"></i>
              {{item.playTime | filterPlayCountInfo}}
            </span>
            <span class="duration">
              <i class="iconfont icon-paihangbang"></i>
              {{item.duration * 1000 | filterSetTime}}
            </span>
            <i class="iconfont icon-bofang"></i>
          </div>
          <!-- 其他 -->
          <div class="cover"
            v-else
            :style="{backgroundColor: item.msgs ? 'white': 'rgb(241, 238, 238)'}"
          >
            <img :src="item.img" alt="">
            <!-- 单曲图片图标 -->
            <span class="newsong-icon" v-if="item.song || item.typeNum === 18">
              <i class="iconfont icon-bofang"></i>
            </span>
            <div class="right-info">
              <p class="info-name van-ellipsis">
                <!-- 专栏,电台与歌单tag -->
                <span class="tag" v-if="item.playlist">歌单</span>
                <span class="tag" v-if="item.djRadio">{{item.djRadio.category}}</span>
                <span class="tag" v-if="item.topic">专栏</span>
                {{item.name}}
                {{item.program}}
              </p>
              <p class="byname van-ellipsis"
                v-if="item.playlist || item.djRadio || item.topic"
              >
              by {{item.byNickname}}
              </p>
              <p class="byname van-ellipsis" v-else>
                <span class="tag" v-if="item.channels">{{item.channels}}</span>
                {{item.byNickname}}
              </p>
            </div>
          </div>
        </div>
        <div class="actions">
          <div class="icon" @click="noAchieve">
            <i class="iconfont icon-xunhuan1-copy"></i>
            {{item.info.shareCount ? item.info.shareCount : '转发'}}
          </div>
          <div class="icon" @click="noAchieve">
            <i class="iconfont icon-pinglun"></i>
            {{item.info.commentCount ? item.info.commentCount : '评论'}}
          </div>
          <div class="icon" @click="noAchieve">
            <i class="iconfont icon-zanpress"></i>
            {{item.info.likedCount ? item.info.likedCount : '赞'}}
          </div>
          <i class="iconfont icon-sandian on-touch" @click="showShareUser = true"></i>
        </div>
      </div>
    </div>
    <van-share-sheet
      v-model="showShareUser"
      title="分享"
      :options="optionsUser"
    />
  </div>
</template>
<script>
import { userEvent } from 'api/apis'
import { mapGetters } from 'vuex'
import { filterSetDate, filterPlayCountInfo, filterSetTime } from 'utils/filters'
import types from '@/getShareInfo/shareInfo'
import shareTypes from '@/getShareInfo/shareEvent'
import Loading from 'components/Loading'
export default {
  name: 'UserDynamic',
  props: {
    refresh: {
      type: Number
    }
  },
  data () {
    return {
      dataMsg: [],
      loading: false,
      size: 0,
      showShareUser: false,
      optionsUser: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
          { name: '复制链接', icon: 'link' },
          { name: '二维码', icon: 'qrcode' }
        ],
        [
          { name: '分享', icon: 'poster' }
        ]
      ]
    }
  },
  computed: {
    ...mapGetters(['accountUid', 'nickName', 'avatarUrl'])
  },
  watch: {
    refresh: {
      handler (newV, old) {
        this.loading = false
        this.getUserEvent(this.accountUid)
      },
      immediate: true
    }
  },
  methods: {
    // 获取用户动态
    getUserEvent (id) {
      userEvent(id)
        .then(data => {
          this.dataMsg = this.getData(data.events)
          this.$nextTick(() => {
            this.loading = true
          })
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    getData (arr) {
      const res = []
      arr.forEach((val, index) => {
        res.push(JSON.parse(val.json))
        const json = JSON.parse(val.json)
        // 类型,原本数据为数字,为了规范加字母开头
        const typeDate = 'a' + val.type
        // 转发评论点赞信息
        const info = val.info
        // msg图片
        const pics = val.pics
        // 时间
        const time = val.showTime
        // 这里通过 [] 来读取对象value
        res[index].type = types[typeDate]
        // 分享内容信息
        // 请求数据类型
        const data = res[index].type.data
        const dataJson = res[index].type.dataJson
        res[index].info = info
        res[index].pics = pics
        res[index].time = time
        // 是不是转发
        if (dataJson) {
          // 转发数据
          const eventData = JSON.parse(json[data][dataJson])
          // 遍历key
          const eventType = shareTypes[Object.keys(eventData)[1]]
          const mold = eventType.data
          const img = eventType.img
          const name = eventType.name
          const creator = eventType.creatorName[0]
          const nickname = eventType.creatorName[1]
          res[index].msgs = eventData.msg
          res[index].typeNum = json.event.type
          res[index].img = mold === 'song' ? eventData.song.album.blurPicUrl : eventData[mold][img]
          res[index].name = mold === 'song' ? eventData.song.name + `(${eventData.song.alias[0]})` : eventData[mold][name]
          // 视频
          if (eventData.video) {
            // 播放次数,时间
            res[index].playTime = eventData.video.playTime
            res[index].duration = eventData.video.duration
          }
          // 电台tag
          if (eventData.channels) {
            res[index].channels = eventData.program.channels[0]
          }
          // 转发电台判断
          if (creator === nickname) {
            res[index].byNickname = eventData[mold][creator]
          } else {
            res[index].byNickname = mold === 'song' ? eventData.song.artists[0].name : eventData[mold][creator][nickname]
          }
        } else {
          // 对应类型和数据
          const mold = res[index].type
          const jsonData = json[data]
          // 获取对应字符
          const img = mold.img
          const name = mold.name
          const creator = mold.creatorName[0]
          const nickname = mold.creatorName[1]
          const byName = data === 'song' ? jsonData.artists[0].name : jsonData[creator][nickname]
          res[index].img = jsonData[img]
          res[index].name = data === 'song' ? jsonData[name] + `(${jsonData.alias[0]})` : jsonData[name]
          res[index].byNickname = byName
          // 视频
          if (json.video) {
            // 播放次数,时间
            res[index].playTime = json.video.playTime
            res[index].duration = json.video.duration
          }
        }
      })
      return res
    },
    noAchieve () {
      this.$toast('此功能尚未开通, 敬请期待')
    }
  },
  filters: {
    filterSetDate,
    filterPlayCountInfo,
    filterSetTime
  },
  components: {
    Loading
  }
}
</script>
<style lang='scss' scoped>
.dynamic {
  .dynamic-card {
    padding: .4rem .3rem 0;
    // 头部
    .top {
      display: flex;
      height: .75rem;
      // 头像
      .img-info {
        width: .75rem;
        margin-right: .2rem;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .author {
        flex: 1;
        line-height: 1.5;
        .nickname {
          font-size: .28rem;
          color: #4ca1e6;
          .category {
            color: #7b7c7d;
          }
        }
        .time {
          font-size: .22rem;
          color: #7b7c7d;
        }
        .img-content {
          width: 5.4rem;
          height: 0;
          padding-bottom: 2rem;
          img {
            width: 100%;
            border-radius: 0.2rem;
          }
        }
      }
    }
    // 内容区
    .content {
      padding: .2rem .2rem 0 .95rem;
      // 用户发言
      .msg {
        padding-bottom: .1rem;
        color: black;
        font-size: .3rem;
        line-height: 1.4;
      }
      // 用户发的图片
      .image {
        width: 75%;
        padding-bottom: .1rem;
        img {
          display: block;
          width: 75%;
          height: auto;
          border-radius: .1rem;
        }
      }
      // 分享内容
      .container-share {
        background-color: rgb(241, 238, 238);
        border-radius: .1rem;
        &:active {
          background-color: rgb(1, 1, 1, .1);
        }
        // 转发作者发言
        .share-msg {
          margin-bottom: .2rem;
          font-size: .26rem;
          line-height: 1.4;
          color: rgb(78, 76, 76);
          .share-name {
            font-size: .26rem;
            color: #55a1df;
          }
        }
        // 视频卡片
        .viedo-img {
          position: relative;
          width: 100%;
          padding: 0;
          img {
            width: 100%;
            height: auto;
            border-radius: .1rem;
          }
          // 蒙版
          .mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(136, 134, 134, 0.5);
          }
          // 中间播放icon
          .icon-bofang {
            position: absolute;
            top: 50%;
            left: 50%;
            color: rgba(255, 255, 255, .7);
            font-size: .8rem;
            transform: translate(-50%, -50%);
          }
          .duration {
            position: absolute;
            right: .1rem;
            bottom: .1rem;
            color: #fff;
            font-size: .24rem;
            i {
              padding-right: .05rem;
              font-size: .2rem;
            }
          }
          .playtime {
            @extend .duration;
            left: .1rem;
            .icon-gedanbofangliang_ {
              padding-right: 0;
            }
          }
        }
        // 分享条
        .cover {
          position: relative;
          display: flex;
          align-items: center;
          height: .8rem;
          padding: .1rem;
          border-radius: .1rem;
          img {
            width: .8rem;
            height: .8rem;
            margin-right: .2rem;
            border-radius: .1rem;
          }
          // 歌单icon
          .newsong-icon {
            position: absolute;
            left: .35rem;
            top: .35rem;
            z-index: 3;
            width: .3rem;
            height: .3rem;
            border-radius: 50%;
            background-color: rgb(255, 255, 255, .8);
            overflow: hidden;
            .icon-bofang {
              position: absolute;
              left: 50%;
              top: 50%;
              color: #dd001b;
              font-size: .16rem;
              transform: translate(-50%, -50%);
            }
          }
          // 右边内容
          .right-info {
            width: 78%;
            .tag {
              display: inline-block;
              margin-right: .08rem;
              padding: .03rem .08rem .01rem;
              color: #dd001b;
              font-size: .17rem;
              border: .01rem solid #dd001b;
              border-radius: .05rem;
            }
            .info-name {
              width: 100%;
              padding-top: .04rem;
              color: black;
              font-size: .26rem;
            }
            .byname {
              width: 100%;
              padding-top: .15rem;
              color: rgb(102, 100, 100);
              font-size: .2rem;
            }
          }
        }
      }
      // 底部内容
      .actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.1rem;
        .icon {
          display: flex;
          flex: 1;
          height: .5rem;
          line-height: .5rem;
          font-size: .26rem;
          color: #7b7c7d;
          i {
            display: flex;
            margin-right: .06rem;
            font-size: .38rem;
            color: rgb(68, 67, 67);
            &:active {
              color: #7b7c7d;
            }
          }
        }
        .icon-sandian {
          flex: .6;
          height: 1.1rem;
          line-height: 1.1rem;
          text-align: center;
          font-size: .34rem;
          color: #7b7c7d;
        }
      }
    }
  }
}
</style>
