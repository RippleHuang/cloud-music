<template>
  <div class="sticky-show">
    <div class="sticky-top">
      <slot name="top"></slot>
    </div>
    <div class="sticky-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StickyShow'
}
</script>
<style lang='scss' scoped>
.sticky-show {
  position: sticky;
  top: 1.2rem;
  .sticky-top {
    border-radius: .3rem .3rem 0 0;
  }
}
</style>
