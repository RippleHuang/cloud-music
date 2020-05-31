<template>
  <van-tabs class="nav-tabs" v-model="active" color="#fff" background="#dd001b">
    <van-tab
    class= "nav-tab"
    v-for="(item, index) in list"
    :key="index"
    :title="item.text"
    :to="item.path"
    >
    </van-tab>
  </van-tabs>
</template>
<script>
export default {
  name: 'NavBar',
  props: {
    list: {
      type: Array
    }
  },
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
