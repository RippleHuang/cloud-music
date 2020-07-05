<template>
  <div class="search-input">
    <span
      class="rollback on-touch"
      @click="$router.go(-1)"
    >
      <i class="iconfont icon-zuo"></i>
    </span>
    <div class="search-con">
      <input
        class="search-text"
        type="text"
        :placeholder="placeholder"
        v-model="search"
        required="required"
        @input="getResult"
        @blur="show = false"
        @focus="show = search ? true : false"
        ref="searchInput"
      >
      <i @click="clear" class="iconfont icon-chahao"></i>
    </div>
    <!-- 搜索建议列表信息 -->
    <ul class="search-list" v-show="show">
      <li class="van-ellipsis"><span class="text">搜索 "{{ search }}"</span></li>
      <li
        class="van-ellipsis on-touch"
        v-for="(item, index) in searchList" :key="index"
        @click="$router.push(`/searchresult?text=${item.keyword}`)"
      >
        <i class="iconfont icon-sousuo"></i>
        {{ item.keyword }}
      </li>
    </ul>
  </div>
</template>
<script>
import { defaultSearch, suggestSearch } from 'api/apis'
export default {
  name: 'SearchInput',
  data () {
    return {
      search: '',
      placeholder: '',
      searchList: '',
      // 搜索提示列表
      show: false
    }
  },
  watch: {
    $route: {
      handler (to, from) {
        if (to.path === '/search') {
          this.$nextTick(() => {
            this.$refs.searchInput.focus()
            // 为空才请求
            if (this.search === '') this.getDefaultSearch()
          })
        }
      },
      immediate: true
    },
    search (val, oldV) {
      this.$refs.searchInput.style.borderColor = val ? '#fff' : '#ddd'
    }
  },
  methods: {
    clear () {
      this.search = ''
    },
    // 进入页面获取默认提示
    getDefaultSearch () {
      defaultSearch()
        .then(data => {
          this.placeholder = data.data.showKeyword
        })
        .catch(() => {
          this.$toast('获取默认搜索失败')
        })
    },
    // 获取搜索提示列表
    getSuggestSearch () {
      suggestSearch(this.search)
        .then(data => {
          this.searchList = data.result.allMatch
        })
        .catch(() => {
          this.$toast('获取默认搜索失败')
        })
    },
    getResult () {
      // 不为空搜索
      if (this.search) {
        this.debounce(this.getSuggestSearch(), 100)
        // 显示列表
        this.show = true
      } else {
        // 隐藏列表
        this.show = false
      }
    },
    // 防抖
    debounce (fn, delay) {
      let timer = null
      return function () {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(fn, delay)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.search-input {
  position: fixed;
  display: flex;
  z-index: 3;
  width: 100%;
  height: 1.2rem;
  background-color: #dd001b;
  .rollback {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    .icon-zuo {
      font-size: .45rem;
      color: #fff;
    }
  }
  // 搜索框
  .search-con {
    position: relative;
    display: flex;
    align-items: center;
    height: 1.2rem;
    flex: 1;
    .search-text {
      width: 94%;
      height: .6rem;
      position: relative;
      font-size: 0.36rem;
      color: #eee;
      caret-color: #fff;
      background-color: #dd001b;
      border-bottom: .01rem solid #ddd;
      // placeholder颜色,谷歌,火狐,ie
      @mixin public {
        color:rgba(255, 255, 255, .6);
        font-size: .27rem;
        font-weight: bold;
      }
      &::-webkit-input-placeholder {
        @include public;
      }
      &:-moz-placeholder {
        @include public;
      }
      &::-moz-placeholder {
        @include public;
      }
      &:-ms-input-placeholder {
        @include public;
      }
    }
    .icon-chahao {
      position: absolute;
      right: .25rem;
      bottom: .35rem;
      display: none;
      font-size: .5rem;
      color: #fff;
    }
    // :valid 选择器在表单元素的值需要根据指定条件验证时设置指定样式
    //（这里要记得在input里面加上required="required"，表示必须）
    .search-text:valid + .icon-chahao {
      display: block;
    }
  }
  .search-list {
    position: absolute;
    left: 0.4rem;
    top: 1.2rem;
    z-index: 2;
    width: 90%;
    box-shadow: 0 4px 16px #aaa;
    background-color: #fff;
    li {
      height: .8rem;
      padding: .2rem;
      line-height: .5rem;
      color: #888;
      font-size: .26rem;
      border-bottom: .01rem solid rgb(236, 235, 235);
      box-sizing: border-box;
      .text {
        color: rgb(51, 131, 243);
      }
      .icon-sousuo {
        margin-right: .15rem;
        font-size: .26rem;
      }
    }
  }
}
</style>
