<template>
  <div class="img-cover">
    <img class="img-circle" :src="imgUrl" v-show="loaded" @load="loaded = true" alt="">
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ImgCover',
  props: {
    imgUrl: {
      type: String
    }
  },
  data () {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters(['playState'])
  },
  watch: {
    playState: {
      handler (val, oldVal) {
        document.querySelector('.img-circle').style.animationPlayState = val ? 'running' : 'paused'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.img-cover {
  box-sizing: border-box;
  width: 5.3rem;
  height: 5.3rem;
  border-radius: 50%;
  background-color: black;
  .img-circle {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: .15rem solid rgb(74, 160, 187, .6);
    animation: rotating 22s linear infinite;
    transition: all .5s ease-out;
  }
}
// 图片旋转
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
