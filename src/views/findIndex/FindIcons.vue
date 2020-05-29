<template>
<div class="find-icon-content">
  <icon
    v-for="(item, index) in FindIcons"
    :icons="item"
    :key="index"
  >
  </icon>
</div>
</template>
<script>
import Icon from '@/components/Icon'
import { FindIcons } from '@/getIcons/icons'
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
html{
  font-size:62.5%
}
.find-icon-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 1.6rem;
  padding: .3rem 0;
}
</style>
