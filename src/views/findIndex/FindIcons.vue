<template>
<div class="find-icon-content">
  <div class="find-icon-list">
    <icon
      v-for="(item, index) in FindIcons"
      :icons="item"
      :key="index"
    />
  </div>
</div>
</template>
<script>
import Icon from 'components/Icon'
import { FindIcons } from 'getIcons/icons'
export default {
  name: 'FindIcons',
  data () {
    return {
      FindIcons
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.FindIcons = FindIcons()
    }
  },
  components: {
    Icon
  }
}
</script>
<style lang="scss" scoped>
.find-icon-content {
  display: flex;
  justify-content: center;
  width: 100%;
  .find-icon-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 92.8%;
    height: 1.8rem;
    padding: .3rem 0;
  }
}
</style>
