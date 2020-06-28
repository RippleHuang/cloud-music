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
            home
            :songplayCount="item.playCount || item.score"
            :privacy="0"
            @playSong="setAudioList(index, index === 1 ? weekDataSong : allDataSong)"
          />
        </ul>
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
      loading: true
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
            this.$toast('对方设置了访问权限')
            this.$router.go(-1)
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

</style>
