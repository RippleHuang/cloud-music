<template>
  <div class="dynamic">
    <div class="data-info" v-show="!dataInfo">暂时还没有动态哦</div>
    <div class="dynamic-card van-hairline--bottom on-touch" v-for="(item, index) in dataMsg" :key="index">
      <div class="top">
        <div class="img-info">
          <img :src="avatarUrl" alt />
        </div>
        <div class="author">
          <h1 class="nickname">
            {{nickName}}
            <span class="category">{{item.type.type}}</span>
          </h1>
          <span class="time">{{item.time | filterSetYear}}</span>
        </div>
      </div>
      <div class="content">
        <h1 class="msg">{{item.msg}}</h1>
        <div class="image" v-for="(img, index1) in item.pics" :key="index1">
          <img :src="img.originUrl" alt="">
        </div>
        <div class="container-share">
          <!-- <img :src="item[item.type.img]" alt=""> -->
          {{item.type.img}}
        </div>
        <div class="actions">
          <div class="icon">
            <i class="iconfont icon-xunhuan1-copy"></i>
            {{item.info.shareCount ? item.info.shareCount : '转发'}}
          </div>
          <div class="icon">
            <i class="iconfont icon-pinglun"></i>
            {{item.info.commentCount ? item.info.commentCount : '评论'}}
          </div>
          <div class="icon">
            <i class="iconfont icon-zanpress"></i>
            {{item.info.likedCount ? item.info.likedCount : '赞'}}
          </div>
          <i class="iconfont icon-sandian"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userEvent } from 'api/apis'
import { mapGetters } from 'vuex'
import { filterSetYear } from 'utils/filters'
import types from '@/getShareInfo/shareInfo'
export default {
  name: 'UserDynamic',
  props: {
    refresh: {
      type: Number
    }
  },
  data () {
    return {
      dataInfo: true,
      dataMsg: [],
      type: '',
      pic: 'http://p2.music.126.net/LpiNijwNVIo-21ShUh8ZhA==/109951165015551658.jpg'
    }
  },
  computed: {
    ...mapGetters(['accountUid', 'nickName', 'avatarUrl'])
  },
  watch: {
    refresh: {
      handler (newV, old) {
        this._getUserEvent(this.accountUid)
      },
      immediate: true
    }
  },
  created () {
    this._getUserEvent(this.accountUid)
  },
  methods: {
    // 获取用户动态
    _getUserEvent (id) {
      userEvent(id)
        .then(data => {
          if (data.size === 0) {
            this.dataInfo = false
            return
          }
          this.dataMsg = this.getData(data.events)
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    getData (arr) {
      const res = []
      arr.forEach((val, index) => {
        res.push(JSON.parse(val.json))
        var json = JSON.parse(val.json)
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
        // 文章和发布视频没有处理,如果有会报错
        if (dataJson) {
          // 转发数据,这里只定义了转发分享单曲的,其他的还需要判断,由于返回没有类型,这里从简处理
          const Data = JSON.parse(json[data][dataJson])
          res[index].msgs = Data.msg
          res[index].img = Data.song.album.blurPicUrl ? Data.song.album.blurPicUrl : this.pic
          res[index].name = Data.song.name ? Data.song.name + `(${Data.song.alias[0]})` : '暂无名称'
          res[index].byNickname = Data.song.artists[0].name ? Data.song.artists[0].name : '暂无'
        } else {
          const img = res[index].type.img
          const name = res[index].type.name
          const dj = res[index].type.dj
          const creator = res[index].type.creatorName[0]
          const nickname = res[index].type.creatorName[1]
          const image = dj ? json[data][dj][img] : json[data][img]
          const byName = data === 'song' ? json[data].artists[0].name : json[data][creator][nickname]
          res[index].img = image
          res[index].name = data === 'song' ? json[data][name] + `(${json[data].alias[0]})` : json[data][name]
          res[index].byNickname = byName
        }
      })
      console.log(res)
      return res
    }
  },
  filters: {
    filterSetYear
  }
}
</script>
<style lang='scss' scoped>
.dynamic {
  .data-info {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dynamic-card {
    padding: .4rem .3rem;
    .top {
      display: flex;
      height: .75rem;
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
          color: #3399ea;
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
    .content {
      padding: .2rem .2rem 0 .95rem;
      .image {
        width: 75%;
        padding: .15rem 0 .1rem;
        img {
          display: block;
          width: 75%;
          height: auto;
          border-radius: .1rem;
        }
      }
      .actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .icon {
          display: flex;
          height: .5rem;
          line-height: .5rem;
          margin-right: .6rem;
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
          width: .5rem;
          height: .5rem;
          line-height: .5rem;
          text-align: center;
          font-size: .34rem;
          color: #7b7c7d;
        }
      }
    }
  }
}
.none {
  display: none;
}
.videotag {
  box-sizing: border-box;
  font-size: 0.2rem;
  color: #ccc;
  padding: 0.04rem 0.13rem;
}
</style>
