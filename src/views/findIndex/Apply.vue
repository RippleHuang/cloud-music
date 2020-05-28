<template>
<div class="apply-content">
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
  name: 'Apply',
  data () {
    return {
      FindIcons
    }
  },
  mounted () {
    this.iniData()
  },
  methods: {
    iniData () {
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
.apply-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 1.6rem;
  padding: 0.2rem 0 0.3rem;
}
</style>
