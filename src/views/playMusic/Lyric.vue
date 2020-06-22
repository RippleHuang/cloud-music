<template>
  <div class="wrapper">
    <div class="full" v-if="noLyric">{{noLyricText}}</div>
    <ul :style="{marginTop: marginTop}">
      <li
        v-for="(item, index) in lyricArray"
        :key="index"
        :class="{active: index === nowLyricIndex}"
      >
        {{ item | setWords }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Lyric',
  props: {
    lyricArray: {
      type: Array
    },
    // 当前播放的歌词索引
    nowLyricIndex: {
      type: Number
    },
    noLyric: {
      type: Boolean
    },
    noLyricText: {
      type: String
    }
  },
  data () {
    return {
      marginTop: '0rem'
    }
  },
  filters: {
    setWords: function (val) {
      if (val && val.words) {
        return val.words
      }
    }
  },
  methods: {
    setCurrent (index) {
      // 每次移动是移动一行歌词的高度，一行歌词高度是 0.8 rem
      // 2.4为高亮歌词距离顶部位置
      const top = 2.4 - index * 0.8
      // top 不能为正数
      this.marginTop = top > 0 ? 0 : top + 'rem'
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  position: absolute;
  top: 1.2rem;
  bottom: 3.2rem;
  width: 100%;
  padding: 0 .5rem;
  box-sizing: border-box;
  color: rgb(192, 190, 190);
  overflow: hidden;
  ul {
    position: relative;
    z-index: 1; // 解决过渡效果带来的字体模糊
    margin: 0;
    padding-top: 2rem;
    list-style: none;
    text-align: center;
    transition: margin-top .6s ease-out;
    // 解决过渡效果带来的抖动
    transform: translateZ(0);
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: .8rem;
      line-height: 1.3;
      font-size: .32rem;
      text-align: center;
    }
  }
  .active {
    color: #fff;
  }
  .full {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>
