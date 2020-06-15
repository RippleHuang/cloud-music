<template>
  <div class="user-info" :style="{ background: `url(${coverImgUrl}) fixed` }">
    <opacity-card
      :isFixed="isFixed"
      :opacity="opacity"
      :followeds="followeds"
      :newFollows="newFollows"
      :gender="gender"
      :birthday="birthday"
      :coverImgUrl="coverImgUrl"
    ></opacity-card>
    <div class="user-tab">
      <van-tabs
        v-model="active"
        swipeable
        title-active-color="#dd001b"
        line-width="0.6rem"
      >
        <van-tab title="主页">
          <loading :height="4.58" v-show="!loading" />
          <div class="show" v-show="loading" @touchmove="scrollHandler">
            <ul class="song-group">
              <!-- 听歌排行 -->
              <li class="song-list">
                <div class="left">
                  <div class="list-cover">
                    <div class="bgc">
                      <i class="iconfont icon-paihangbang"></i>
                    </div>
                  </div>
                  <div class="list-info">
                    <p class="list-title first">听歌排行</p>
                    <p class="list-num">累计听歌 {{listenSongs}}首</p>
                  </div>
                </div>
              </li>
              <!-- 我喜欢的音乐 -->
              <song-list-li
                v-for="(item, index) in myLoveList" :key="index"
                :coverImgUrl="item.coverImgUrl"
                :name="item.name"
                :trackCount="item.trackCount"
                :privacy="item.privacy"
                :myLove="true"
                :playCount="item.playCount"
              >
              </song-list-li>
            </ul>
            <!-- 创建的歌单 -->
            <ul class="song-group" v-if="createNum !== 1">
              <h2>创建的歌单 <span>({{createNum - 1}})</span></h2>
              <song-list-li
                v-for="(item, index) in createList" :key="index"
                :coverImgUrl="item.coverImgUrl"
                :name="item.name"
                :trackCount="item.trackCount"
                :privacy="item.privacy"
                :playCount="item.playCount"
              >
              </song-list-li>
              <div class="more on-touch" v-if="createNum > 10" @click="moreList">更多歌单&nbsp;&gt;</div>
            </ul>
            <!-- 收藏的歌单 -->
            <ul class="song-group" v-if="favoritesNum !== 0">
              <h2>收藏的歌单 <span>({{favoritesNum}})</span></h2>
              <song-list-li
                v-for="(item, index) in favoritesList" :key="index"
                :coverImgUrl="item.coverImgUrl"
                :name="item.name"
                :trackCount="item.trackCount"
                :creatorNickname="item.creator.nickname"
                :privacy="item.privacy"
                :playCount="item.playCount"
              >
              </song-list-li>
              <div class="more on-touch" v-if="favoritesNum > 10" @click="moreList">更多歌单&nbsp;&gt;</div>
            </ul>
            <div class="basic-information">
              <h2>基本信息</h2>
              <p class="list-info">
                <span class="list-name">村龄：</span>
                <span class="list-con">{{age}}年 ( {{year}}年{{month}}月注册 )</span>
              </p>
              <p class="list-info" v-if="birthday > 0">
                <span class="list-name">年龄：</span>
                <span class="list-con-age">{{ birthday | filterAge }}后 </span>
                <span class="list-con-astro"> {{astro}}座</span>
              </p>
              <p class="list-info">
                <span class="list-name">性别：</span>
                <span class="list-con">{{gender === 1 ? '男' : '女' }}</span>
              </p>
              <p class="list-info">
                <span class="list-name">个人介绍：</span>
                <span class="list-con">{{signature}}</span>
              </p>
              <div class="more on-touch" @click="noAchieve">更多信息&nbsp;&gt;</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="动态">
          <user-dynamic :refresh="refresh"></user-dynamic>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import OpacityCard from 'components/OpacityCard'
import SongListLi from 'components/SongListLi'
import Loading from 'components/Loading'
import UserDynamic from './UserDynamic'
import { mapGetters } from 'vuex'
import { userDetail, userInfo, playlist } from 'api/apis'
import { filterAge } from 'utils/filters'
import { getAstro } from 'utils/getAstro'
export default {
  name: 'UserInfo',
  data () {
    return {
      active: 0,
      gender: 1,
      signature: '',
      age: 0,
      listenSongs: 0,
      birthday: 0,
      newFollows: 0,
      followeds: 0,
      year: 0,
      astro: '',
      month: 0,
      coverImgUrl: 'http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg',
      createNum: 0,
      favoritesNum: 0,
      myLoveList: [],
      createList: [],
      createListAll: [],
      favoritesList: [],
      favoritesListAll: [],
      loading: false,
      isFixed: false,
      opacity: 1,
      refresh: 0
    }
  },
  created () {
    this.getSongList()
    this.initData()
    window.addEventListener('scroll', this.scrollHandler, true)
  },
  computed: {
    ...mapGetters(['loginState', 'accountUid'])
  },
  watch: {
    $route (to, from) {
      const tag = JSON.parse(localStorage.getItem('tag'))
      // 通过此方法确定是否重新发送请求更新用户数据
      if (tag[0] !== tag[1] && to.path === '/userInfo') {
        this.getSongList()
        this.initData()
        // 通知子组件刷新
        this.refresh = +new Date()
        localStorage.setItem('tag', JSON.stringify([tag[1], this.accountUid]))
      }
    }
  },
  methods: {
    initData () {
      userDetail(this.accountUid)
        .then(data => {
          this.listenSongs = data.listenSongs
          const { backgroundUrl, gender, signature, birthday, newFollows, followeds } = data.profile
          this.coverImgUrl = backgroundUrl
          this.followeds = followeds
          this.newFollows = newFollows
          this.gender = gender
          this.signature = signature
          this.birthday = birthday
          const createTime = data.createTime
          const createDate = new Date(createTime)
          const setAstro = new Date(birthday)
          this.year = createDate.getFullYear()
          this.month = createDate.getMonth() + 1
          this.age = parseInt(data.createDays / 365)
          this.astro = getAstro(setAstro.getMonth() + 1, setAstro.getDate())
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    // 获取歌单
    getSongList () {
      playlist(this.accountUid)
        .then(data => {
          this.getUserInfo(data.playlist)
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    // 获取歌单数
    getUserInfo (arr) {
      userInfo()
        .then(data => {
          // 创建的歌单数
          this.createNum = data.createdPlaylistCount
          // 收藏的歌单数
          this.favoritesNum = data.subPlaylistCount
          // 分割
          const SongListCreate = arr.slice(0, this.createNum)
          // 我喜欢的音乐
          this.myLoveList = SongListCreate.slice(0, 1)
          // 全部
          this.createListAll = SongListCreate.slice(1, this.createNum)
          this.favoritesListAll = arr.slice(this.createNum, this.createNum + this.favoritesNum)
          // 大于截取10,小于取自身,创建音乐需要加一
          const createNumSlice = this.createNum > 11 ? 11 : this.createNum
          const favoritesNumSlice = this.favoritesNum > 10 ? 10 : this.favoritesNum
          // 创建的音乐
          this.createList = SongListCreate.slice(1, createNumSlice)
          // 收藏的音乐
          this.favoritesList = arr.slice(this.createNum, this.createNum + favoritesNumSlice)
          // 写在ajax请求中
          this.$nextTick(() => {
            this.loading = true
          })
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    rollback () {
      this.$router.go(-1)
    },
    scrollHandler () {
      clearTimeout(this.timer)
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var clientHeight = document.documentElement.clientHeight
      if (scrollTop / clientHeight >= 0.35) {
        this.isFixed = true
      } else {
        var opa = 1 - (3 * scrollTop / clientHeight).toFixed(2)
        this.opacity = opa >= 0 ? opa : 0
        this.isFixed = false
      }
    },
    moreList () {
      // 传递数组
      var data = [this.createNum, this.favoritesNum, this.createListAll, this.favoritesListAll]
      // 没有冒号占位符,隐藏参数
      // encodeURIComponent 加密处理
      this.$router.push({
        name: 'listAll',
        params: {
          data: encodeURIComponent(JSON.stringify(data))
        }
      })
    },
    noAchieve () {
      this.$toast('此功能尚未开通, 敬请期待')
    }
  },
  filters: {
    filterAge
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollHandler, true)
  },
  components: {
    OpacityCard,
    SongListLi,
    Loading,
    UserDynamic
  }
}
</script>
<style lang='scss' scoped>
[v-cloak] {
  display: none;
}
.user-info {
  // 给头部 fixed 的留空
  padding-top: 1.2rem;
  .user-tab {
    border-radius: .4rem .4rem 0 0;
    h2 {
      margin: 0 0 .2rem .25rem;
      font-size: .38rem;
      color: black;
      span {
        font-size: .28rem;
        color: rgb(187, 184, 184);
      }
    }
    .more {
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      color: rgb(65, 62, 62);
    }
    .song-group {
      padding: .2rem 0;
      overflow-x: hidden;
      .bgc {
        background-image: linear-gradient(to bottom, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%) !important;
      }
    }
    .basic-information {
      .list-info {
        padding: .1rem .3rem;
        color: #7b7c7e;
        font-size: .25rem;
      }
    }
  }
}
</style>
