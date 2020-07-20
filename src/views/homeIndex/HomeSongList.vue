<template>
  <div class="container">
    <van-collapse class="song-list-con" v-model="activeNames" :border="false">
      <!-- 创建的歌单 -->
      <van-collapse-item name="create" :border="false" class="song-list-item" :is-link="false">
        <!-- 左边标题 -->
        <template #title>
          <div class="left-title">
            <i v-show="activeNames.indexOf('create') === -1" class="iconfont icon-arrow-right"></i>
            <i v-show="activeNames.indexOf('create') !== -1" class="iconfont icon-arrow-down"></i>
            <span class="title">创建的歌单</span>
            <span class="num">({{songListNum.createNum}})</span>
          </div>
        </template>
        <!-- 右边按钮图标 -->
        <template #right-icon>
          <!-- 阻止冒泡 -->
          <div class="right-icons" @click.stop>
            <i class="iconfont icon-jia1 on-touch" @click="createSongList"></i>
            <i class="iconfont icon-sandian on-touch" @click="activeButton(1)"></i>
          </div>
        </template>
        <!-- 歌单列表 -->
        <template #default>
          <!-- 没登录的情况下列表项显示 -->
          <ul class="song-group" v-if="!$store.state.loginState">
            <li class="song-list" @click="$toast('需要登录')">
              <div class="left">
                <div class="list-cover">
                  <div class="bgc">
                    <i class="iconfont icon-xindong2"></i>
                  </div>
                </div>
                <div class="list-info">
                  <p class="list-title" style="width: 3rem;">我喜欢的音乐</p>
                  <p class="list-num">0首</p>
                </div>
              </div>
              <div class="heart-module">
                <van-button class="title-btn" round type="info" @click.stop="$toast('需要登录')">
                  <i class="iconfont icon-xindong"></i>心动模式
                </van-button>
              </div>
            </li>
          </ul>
          <!-- 登录的情况下列表项显示 -->
          <ul class="song-group" v-if="$store.state.loginState">
            <!-- 我喜欢的音乐 -->
            <song-list-li
              v-for="(item, index) in myLoveList" :key="index"
              :coverImgUrl="item.coverImgUrl"
              :name="item.name"
              :trackCount="item.trackCount"
              :privacy="item.privacy"
              myLove
              home
              :id="item.id"
              @getHeartMode="getHeartMode"
              @click.native="$router.push(`/showsong?albumId=${item.id}`)"
            />
            <!-- 由于我喜欢的音乐占了一个,索引+1 -->
            <song-list-li
              v-for="(item, index) in createList" :key="index+1"
              :coverImgUrl="item.coverImgUrl"
              :name="item.name"
              :trackCount="item.trackCount"
              :privacy="item.privacy"
              :description="item.description"
              :id="item.id"
              home
              showActionSheet
              @showAction="showAction"
              @click.native="$router.push(`/showsong?albumId=${item.id}`)"
            />
          </ul>
        </template>
      </van-collapse-item>
      <!-- 收藏的歌单 -->
      <!-- 有收藏的情况下才显示 -->
      <van-collapse-item
        v-if="favoritesList.length > 0"
        name="favorites"
        :border="false"
        class="song-list-item"
        :is-link="false"
      >
        <!-- 左边标题 -->
        <template #title>
          <div class="left-title">
            <i v-show="activeNames.indexOf('favorites') === -1" class="iconfont icon-arrow-right"></i>
            <i v-show="activeNames.indexOf('favorites') !== -1" class="iconfont icon-arrow-down"></i>
            <span class="title">收藏的歌单</span>
            <span class="num">({{songListNum.favoritesNum}})</span>
          </div>
        </template>
        <!-- 右边按钮图标 -->
        <template #right-icon>
          <!-- 阻止冒泡 -->
          <div class="right-icon" @click.stop>
            <i class="iconfont icon-sandian on-touch" @click="activeButton(2)"></i>
          </div>
        </template>
        <!-- 歌单列表 -->
        <template #default>
          <ul class="song-group">
            <song-list-li
              v-for="(item, index) in favoritesList" :key="index"
              :coverImgUrl="item.coverImgUrl"
              :name="item.name"
              :trackCount="item.trackCount"
              :creatorNickname="item.creator.nickname"
              :privacy="item.privacy"
              :description="item.description"
              :id="item.id"
              home
              noCompile
              showActionSheet
              @showAction="showAction"
              @click.native="$router.push(`/showsong?albumId=${item.id}`)"
            />
          </ul>
        </template>
      </van-collapse-item>
    </van-collapse>
    <!-- 动作面板 -->
    <van-action-sheet v-model="show" close-on-popstate :lock-scroll="false">
      <div v-show="active === 1">
        <div class="top on-touch">创建的歌单</div>
        <home-for :icons="createAction" @createSongList="createSongList" :height="0.8" />
      </div>
      <div v-show="active === 2">
        <div class="top on-touch">收藏的歌单</div>
        <home-for :icons="favoriteAction" :height="0.8" />
      </div>
      <div v-show="active === 3">
        <div class="top on-touch van-ellipsis">歌单: {{title}}</div>
        <home-for
          :icons="compile ? songListTwo : songListAction"
          :height="0.8"
          :id="id"
          :title="title"
          :description="description"
          @deleteSongList="deleteSongList"
        />
      </div>
    </van-action-sheet>
    <!-- 弹出框 -->
    <van-dialog
      v-model="showDialog"
      title="新建歌单"
      show-confirm-button
      show-cancel-button
      @confirm="addSongList"
    >
      <van-field
        v-model="name"
        maxlength="40"
        label="名称"
        placeholder="请输入歌单标题"
        show-word-limit
        clearable
      />
      <van-checkbox v-model="checked" shape="square" checked-color="#dd001b">设置为隐私歌单</van-checkbox>
    </van-dialog>
  </div>
</template>
<script>
import { playlist, playlistAdd, playlistDelete } from 'api/apis'
import SongListLi from 'components/SongListLi'
import HomeFor from 'components/HomeFor'
import { mapGetters } from 'vuex'
import { CreateAction, SongListAction } from 'getIcons/icons'
export default {
  name: 'HomeSongList',
  inject: ['reload'],
  props: {
    songListNum: {
      type: Object
    }
  },
  data () {
    return {
      activeNames: ['create'],
      // 收藏歌单详情
      favoritesList: [],
      // 创建歌单详情
      createList: [],
      // 我的喜欢歌单
      myLoveList: [],
      // 动作面板
      show: false,
      createAction: [],
      favoriteAction: [{
        text: '歌单管理',
        icon: 'iconfont icon-liebiaoguanli',
        event: 'no'
      }],
      songListAction: [],
      songListTwo: [],
      compile: false,
      active: 0,
      id: 0,
      title: '',
      description: '',
      // 弹出框
      showDialog: false,
      name: '',
      checked: false
    }
  },
  mounted () {
    this.initData()
    const songListTwo = SongListAction().map(item => item)
    songListTwo.splice(2, 1)
    this.songListTwo = songListTwo
  },
  computed: {
    ...mapGetters(['accountUid', 'loginState'])
  },
  watch: {
    '$store.state.refreshState': {
      handler (val, oldVal) {
        if (this.loginState) {
          this.getPlaylist(this.accountUid)
        }
      },
      immediate: true
    }
  },
  methods: {
    // 初始化图标
    initData () {
      this.createAction = CreateAction()
      this.songListAction = SongListAction()
    },
    // 激活相应动作面板
    activeButton (data) {
      if (this.loginState) {
        this.show = true
        this.active = data
      } else {
        this.$toast('需要登录')
      }
    },
    // 激活歌单列表动作面板
    showAction (data) {
      this.show = true
      this.active = 3
      this.id = data.id
      this.title = data.name
      this.description = data.description
      this.compile = data.noCompile
    },
    getPlaylist (id) {
      playlist(id)
        .then(data => {
          this.sliceInfo(data.playlist)
          // 刷新
          this.reload()
        })
        .catch(() => {
          this.$toast('请求失败,请稍后尝试')
        })
    },
    // 分割歌单
    sliceInfo (arr) {
      const create = this.songListNum.createNum
      const favorites = this.songListNum.createNum + this.songListNum.favoritesNum
      const SongListCreate = arr.slice(0, create)
      this.myLoveList = SongListCreate.slice(0, 1)
      this.createList = SongListCreate.slice(1)
      this.favoritesList = arr.slice(create, favorites)
      // 保存收藏歌单的id
      // 有本地数据先清空
      if (localStorage.getItem('favoriteId')) localStorage.removeItem('favoriteId')
      const favoritesPid = []
      this.favoritesList.forEach(element => {
        favoritesPid.push(element.id)
      })
      // 保存
      localStorage.setItem('favoriteId', JSON.stringify(favoritesPid))
    },
    // 激活模态框
    createSongList () {
      if (!this.loginState) {
        this.$toast('需要登录')
      } else {
        this.showDialog = true
        this.show = false
      }
    },
    // 删除歌单
    deleteSongList () {
      this.show = false
      this.$dialog.confirm({
        message: '确认删除当前歌单？'
      })
        .then(() => {
          playlistDelete(this.id)
            .then(() => {
              this.$toast('删除成功')
              // 重新获取
              this.getPlaylist(this.accountUid)
              this.$emit('reload')
            })
            .catch(() => {
              this.$toast('删除失败')
            })
        })
        .catch(() => {
          this.$toast('已取消')
        })
    },
    // 添加歌单
    addSongList () {
      if (this.name === '') {
        this.$toast('歌单名不能为空')
        return
      }
      const privacy = this.checked ? 10 : 0
      playlistAdd(this.name, privacy)
        .then(() => {
          this.$toast('添加成功')
          // 重新获取
          this.getPlaylist(this.accountUid)
          this.$emit('reload')
        })
        .catch(() => {
          this.$toast('添加歌单失败')
        })
    }
  },
  components: {
    SongListLi,
    HomeFor
  }
}
</script>
<style lang='scss' scoped>
.container {
  display: flex;
  .song-list-con {
    display: flex;
    flex-direction: column;
    width: 100%;
    // 歌单
    .song-list-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      // 标题及右图标
      .left-title {
        display: flex;
        align-items: center;
        height: .9rem;
        i {
          height: .9rem;
          line-height: .9rem;
          font-size: .48rem;
          text-align: center;
        }
        .title {
          font-size: .33rem;
          font-weight: bold;
        }
        .num {
          margin-left: .1rem;
          font-size: .28rem;
          color: rgba(0, 0, 0, .4);
        }
      }
      .right-icons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: .25;
        height: .9rem;
        padding-right: .2rem;
        i {
          flex: 1;
          height: .9rem;
          line-height: .9rem;
          text-align: center;
          font-size: .33rem;
        }
      }
      // 收藏歌单右侧按钮
      .right-icon {
        @extend .right-icons;
        flex: .111;
      }
    }
  }
  .top {
    height: .8rem;
    padding-left: .2rem;
    line-height: .8rem;
    border-bottom: .01rem solid #eee;
    color: rgb(99, 96, 96);
  }
}
.first {
  width: 3rem;
}
</style>
