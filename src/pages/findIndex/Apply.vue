<template>
<div>
  <icon
    v-for="(item, index) in FindIcons"
    :icons="item"
    :key="index"
  >
  </icon>
</div>
</template>
<script>
import Icon from '../../components/Icon'
import { FindIcons } from '../../utils/icons'
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
<style>

</style>
