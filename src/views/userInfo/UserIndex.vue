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
      :avatarUrl="avatarUrl"
      :level="level"
      :nickName="nickName"
      :loading="loading"
    />
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
              <li class="song-list" @click="goRecent">
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
                myLove
                :playCount="item.playCount"
                @click.native="$router.push(`/showsong?albumId=${item.id}`)"
              />
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
                userInfo
                @click.native="$router.push(`/showsong?albumId=${item.id}`)"
              />
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
                :privacy="0"
                userInfo
                :playCount="item.playCount"
                @click.native="$router.push(`/showsong?albumId=${item.id}`)"
              />
              <div class="more on-touch" v-if="favoritesNum > 10" @click="moreList">更多歌单&nbsp;&gt;</div>
            </ul>
            <div class="basic-information">
              <h2>基本信息</h2>
              <p class="list-info" v-if="year">
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
        <van-tab>
          <template #title>动态<span class="size">{{size}}</span></template>
          <div class="data-info" v-if="size === 0">暂时还没有动态哦</div>
          <user-dynamic
            v-else
            :refresh="refresh"
            :avatarUrl="avatarUrl"
            :accountUid="accountUid"
            :nickName="nickName"
          />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import OpacityCard from './OpacityCard'
import SongListLi from 'components/SongListLi'
import Loading from 'components/Loading'
import UserDynamic from './UserDynamic'
import { mapGetters } from 'vuex'
import { userDetail, playlist, userEvent } from 'api/apis'
import { filterAge } from 'utils/filters'
import { getAstro } from 'utils/getAstro'
import { scroll } from '@/mixins/mixins'
export default {
  name: 'UserInfo',
  mixins: [scroll],
  data () {
    return {
      // tab激活
      active: 0,
      // 预览图片
      show: false,
      // 用户信息
      accountUid: 0,
      avatarUrl: '',
      level: 0,
      nickName: '',
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
      coverImgUrl: '',
      // 歌单信息
      createNum: 0,
      favoritesNum: 0,
      myLoveList: [],
      createList: [],
      createListAll: [],
      favoritesList: [],
      favoritesListAll: [],
      // 加载
      loading: false,
      // 后代组件是否刷新
      refresh: 0,
      // 动态数量
      size: 0
    }
  },
  activated () {
    this.accountUid = JSON.parse(this.$route.query.accountUid)
  },
  computed: {
    ...mapGetters(['loginState'])
  },
  /* 监听uid变化 */
  watch: {
    accountUid: {
      async handler (val, oldVal) {
        if (this.loginState) {
          this.loading = false
          await this.initData(val)
          this.getSongList(val)
          this.getUserEvent(val)
          // 通知后代组件刷新
          this.refresh = +new Date()
        } else {
          // 跳转到登录页
          this.$router.push('/login')
        }
      }
    }
  },
  methods: {
    // 用户数据
    initData (uid) {
      userDetail(uid)
        .then(data => {
          this.listenSongs = data.listenSongs
          this.level = data.level
          this.coverImgUrl = data.profile.backgroundUrl ? data.profile.backgroundUrl
            : 'http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg'
          const { gender, signature, birthday, newFollows, followeds, avatarUrl, nickname, playlistCount } = data.profile
          this.followeds = followeds
          this.newFollows = newFollows
          this.avatarUrl = avatarUrl
          this.nickName = nickname
          // 创建的歌单数
          this.createNum = playlistCount
          this.gender = gender
          this.signature = signature
          this.birthday = birthday
          const createTime = data.createTime
          // 单独判断创建日
          if (createTime > 0) {
            const createDate = new Date(createTime)
            this.year = createDate.getFullYear()
            this.month = createDate.getMonth() + 1
            this.age = parseInt(data.createDays / 365)
          }
          // 单独判断是否有生日
          if (this.birthday > 0) {
            const setAstro = new Date(birthday)
            this.astro = getAstro(setAstro.getMonth() + 1, setAstro.getDate())
          }
        })
        .catch(() => {
          this.$toast('获取用户信息失败,请稍后尝试')
        })
    },
    // 获取歌单
    getSongList (uid) {
      playlist(uid)
        .then(data => {
          this.getUserInfo(data.playlist)
        })
        .catch(() => {
          this.$toast('获取歌单失败,请稍后尝试')
        })
    },
    // 获取歌单数
    getUserInfo (arr) {
      // 分割
      const SongListCreate = arr.slice(0, this.createNum)
      // 我喜欢的音乐
      this.myLoveList = SongListCreate.slice(0, 1)
      // 创建的音乐
      this.createListAll = SongListCreate.slice(1, this.createNum)
      // 大于截取10,小于取自身,创建音乐需要加一
      const createNumSlice = this.createNum > 11 ? 11 : this.createNum
      this.createList = SongListCreate.slice(1, createNumSlice)
      // 收藏的音乐
      if (arr.length - this.createNum > 0) {
        // 收藏的歌单数
        this.favoritesNum = arr.length - this.createNum
        const favoritesNumSlice = this.favoritesNum > 10 ? 10 : this.favoritesNum
        this.favoritesListAll = arr.slice(this.createNum, this.createNum + this.favoritesNum)
        this.favoritesList = arr.slice(this.createNum, this.createNum + favoritesNumSlice)
      } else {
        this.favoritesNum = 0
        this.favoritesListAll = []
        this.favoritesList = []
      }
      this.$nextTick(() => {
        this.loading = true
      })
    },
    // 获取用户动态数
    getUserEvent (uid) {
      userEvent(uid)
        .then(data => {
          this.size = data.size
        })
        .catch(() => {
          this.$toast('获取动态失败,请稍后尝试')
        })
    },
    rollback () {
      this.$router.go(-1)
    },
    // 跳转到展示页
    moreList () {
      // 传递数组
      var data = [this.createNum, this.favoritesNum, this.createListAll, this.favoritesListAll, this.nickName]
      // 没有冒号占位符,隐藏参数
      // encodeURIComponent 加密处理
      this.$router.push({
        name: 'listAll',
        params: {
          data: encodeURIComponent(JSON.stringify(data))
        }
      })
    },
    // 听歌排行
    goRecent () {
      this.$router.push({
        path: '/recentplay',
        query: {
          uid: this.accountUid,
          name: this.nickName
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
        .list-con {
          line-height: 1.3;
        }
      }
    }
    .size {
      position: absolute;
      left: 60%;
      top: .34rem;
      font-size: .22rem;
      color: rgb(180, 177, 177);
    }
    // 没有动态
    .data-info {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 3.2rem;
    }
  }
}
</style>
