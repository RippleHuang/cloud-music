<template>
  <div class="manage-list">
    <default-nav
      :title="'编辑歌单信息'"
      :background="'#dd001b'"
      defaultShow
    />
    <van-field
      v-model="name"
      maxlength="40"
      label="名称"
      show-word-limit
      clearable
    />
    <van-field
      v-model="message"
      rows="1"
      autosize
      label="描述"
      type="textarea"
      placeholder="暂无描述"
      maxlength="1000"
      show-word-limit
      clearable
    />
  </div>
</template>
<script>
import DefaultNav from 'components/DefaultNav'
import { playlistUpdata } from 'api/apis'
export default {
  name: 'CompileSongList',
  props: {
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
  activated () {
    this.name = this.title
    this.message = this.description
  },
  data () {
    return {
      name: '',
      message: ''
    }
  },
  methods: {
    listUpdata () {
      playlistUpdata(this.id, this.name, this.message)
        .then(data => {
          this.$toast('修改成功')
        })
        .catch(() => {
          this.$toast('更新失败')
        })
    }
  },
  // 离开前提交
  beforeRouteLeave (to, from, next) {
    if (this.name === '') {
      this.$toast('名称不能为空')
    } else if (this.name === this.title && this.message === this.description) {
      next()
    } else {
      this.listUpdata()
      next()
    }
  },
  components: {
    DefaultNav
  }
}
</script>
<style lang='scss' scoped>

</style>
