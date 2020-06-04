<template>
<div>
忘记密码
</div>
</template>
<script>
export default {
  name: 'ForgetPass',
  props: {
    name: {
      type: String
    }
  },
  mounted () {
    this.$emit('viewData', this.name)
  }
}
</script>
<style lang='scss' scoped>

</style>
