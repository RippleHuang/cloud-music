<template>
  <div class="phone-login">
    <span class="info">未注册手机号登录后将自动创建账号</span>
    <div class="phone-con">
      <span class="phone-left">+86</span>
      <!-- v-model.trim 自动过滤输入内容最开始  和 最后的 空格，中间的会保留一个空格，多的会被过滤掉 -->
      <input
      class="phone-num"
      type="text"
      placeholder="请输入手机号"
      maxlength="11"
      required="required"
      v-model.trim="phoneNumber"
      @input="inputNumber"
      >
      <i @click="clear" class="iconfont icon-chahao"></i>
    </div>
    <van-button class="next" round>下一步</van-button>
  </div>
</template>
<script>
export default {
  name: 'LoginPhone',
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      phoneNumber: ''
    }
  },
  mounted () {
    this.$emit('viewData', this.name)
  },
  methods: {
    clear () {
      this.phoneNumber = ''
    },
    inputNumber () {
      /* 左侧字体颜色 */
      if (this.phoneNumber !== '') {
        document.querySelector('.phone-left').style.color = 'balck'
        console.log(this.phoneNumber)
      } else {
        document.querySelector('.phone-left').style.color = 'rgb(158, 151, 152)'
        console.log('b')
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.phone-login {
  padding: .8rem .5rem 0;
  box-sizing: border-box;
  .info {
    color: rgb(158, 151, 152);
    font-size: .28rem;
  }
  .phone-con {
    position: relative;
    display: flex;
    align-items: center;
    height: 1.2rem;
    margin-top: 1rem;
    border-bottom: .01rem solid rgba(163, 161, 161, 0.8);
    .phone-left {
      margin-top: .32rem;
      font-size: .32rem;
      color: rgb(158, 151, 152);
    }
    .phone-num {
      height: .9rem;
      font-size: .32rem;
      padding: .3rem 0 0 .2rem;
      // 光标颜色
      caret-color:#e60721;
    }
    .icon-chahao {
      position: absolute;
      right: 0;
      bottom: .18rem;
      display: none;
      font-size: .46rem;
      color: rgba(163, 161, 161, 0.8);
    }
    // :valid 选择器在表单元素的值需要根据指定条件验证时设置指定样式
    //（这里要记得在input里面加上required="required"，表示必须）
    .phone-num:valid + .icon-chahao {
      display: block;
    }
  }
  .next {
    width: 100%;
    height: 1rem;
    margin-top: 1rem;
    color: #fff;
    font-size: .35rem;
    font-weight: bold;
    background-color: #e60721;
    border: none;
    &:active {
      background-color: #b10418;
    }
  }
}
</style>
