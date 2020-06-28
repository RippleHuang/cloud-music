<template>
  <ul class="item-list">
    <li
      v-for="(item, index) in icons"
      :key="index"
      class="home-apply-item on-touch"
      :style="{ height: `${height}rem` }"
      @click="forEvent(item.event)"
    >
      <i
      :class="item.icon"
      class="item-icon" :style="{ flex:height, 'font-size': `${height/2}rem`}"></i>
      <div class="home-apply-content">
        <span class="item-text">{{item.text}}</span>
        <span class="item-num" v-if="!height">({{item.num}})</span>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'HomeFor',
  props: {
    icons: {
      type: Array
    },
    height: {
      type: Number
    },
    id: {
      type: Number
    },
    title: {
      type: String
    },
    description: {
      type: String
    }
  },
  methods: {
    forEvent (event) {
      this[event]()
    },
    // 循环出来的事件
    no () {
      this.$toast('创建新歌单,编辑歌单信息,删除可用,其他功能尚未实装')
    },
    noAction () {
      this.$toast('我的电台,我的收藏,其他功能尚未实装')
    },
    createList () {
      this.$emit('createSongList')
    },
    compile () {
      this.$router.push({
        name: 'compilesonglist',
        params: {
          id: this.id,
          title: this.title,
          description: this.description ? this.description : ''
        }
      })
    },
    delete () {
      this.$emit('deleteSongList')
    },
    goMyRadio () {
      this.$router.push('/myradio')
    },
    goMyFavorite () {
      this.$router.push('/myfavorite')
    }
  }
}
</script>
<style lang='scss' scoped>
.item-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .home-apply-item {
    display: flex;
    height: 1.1rem;
    .item-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1.5;
      font-size: .5rem;
      font-weight: 300;
    }
    // 最后一个无底边框
    &:last-of-type {
      .home-apply-content {
        border: none;
      }
    }
    .home-apply-content {
      display: flex;
      align-items: center;
      flex: 6;
      height: 100%;
      border-bottom: .01rem solid #eee;
      box-sizing: border-box;
      .item-text {
        font-size: .3rem;
      }
      .item-num {
        margin-left: .1rem;
        color: rgba(0, 0, 0, .4);
      }
    }
  }
}
</style>
