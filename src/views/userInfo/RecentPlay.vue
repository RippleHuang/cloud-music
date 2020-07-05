<template>
  <div class="recent-play">
    <default-nav
      :title="$route.query.name + '的听歌排行'"
      :background="'#dd001b'"
      defaultShow
    />
    <van-tabs
      v-model="active"
      swipeable
      class="nav-tabs"
      line-width="1.1rem"
      color="#fff"
      background="#dd001b"
    >
      <van-tab
        class= "nav-tab"
        v-for="index in 2"
        :key="index"
        :title="index === 1 ? '最近一周' : '所有时间'"
      >
        <div class="content-recent" v-if="show">
          <loading :height="4.35" isabsolute v-show="loading" />
          <ul class="song-group" v-show="!loading">
            <song-list-li
              v-for="(item, index) in index === 1 ? weekData : allData" :key="index"
              songShow
              :number="index+1"
              :active="item.song.id === audioIngSong.id"
              :artists="item.song.ar"
              :albumName="item.song.al.name"
              :name="item.song.name"
              :songplayCount="item.playCount"
              :home="item.playCount ? true : false"
              :privacy="0"
              @playSong="setAudioList(index, index === 1 ? weekDataSong : allDataSong)"
            />
          </ul>
        </div>
        <div class="empty" v-if="!show">
          <p>由于对方设置你无法查看TA的听歌排行</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import DefaultNav from 'components/DefaultNav'
import SongListLi from 'components/SongListLi'
import Loading from 'components/Loading'
import { userRecord } from 'api/apis'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'RecentPlay',
  data () {
    return {
      active: 0,
      uid: 0,
      allData: [],
      weekData: [],
      allDataSong: [],
      weekDataSong: [],
      loading: true,
      show: true
    }
  },
  computed: {
    ...mapGetters(['audioIngSong'])
  },
  watch: {
    uid: {
      handler (val, oldV) {
        this.getRecentPlay(val, 1)
        this.getRecentPlay(val, 0)
      }
    }
  },
  activated () {
    this.show = true
    this.uid = JSON.parse(this.$route.query.uid)
  },
  methods: {
    ...mapActions(['selectPlay']),
    setAudioList (index, songList) {
      this.selectPlay({
        list: songList,
        index
      })
    },
    getRecentPlay (uid, type) {
      userRecord(uid, type)
        .then(data => {
          if (type === 1) {
            this.weekData = data.weekData
          } else {
            this.allData = data.allData
          }
          const forData = type === 1 ? data.weekData : data.allData
          for (let i = 0; i <= forData.length - 1; i++) {
            if (type === 1) {
              this.weekDataSong[i] = forData[i].song
            } else {
              this.allDataSong[i] = forData[i].song
            }
          }
          this.$nextTick(() => {
            this.loading = false
          })
        })
        .catch(err => {
          if (err.response.status === 400) {
            this.show = false
          } else {
            this.$toast('获取最近播放失败')
          }
        })
    }
  },
  components: {
    DefaultNav,
    SongListLi,
    Loading
  }
}
</script>
<style lang='scss' scoped>
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  font-size: .32rem;
  color: rgb(116, 113, 113);
}
</style>
