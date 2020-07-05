<template>
  <div class="search-index">
  <search-input />
  <search-default />
  </div>
</template>
<script>
import SearchInput from './SearchInput'
import SearchDefault from './SearchDefault'
export default {
  name: 'SearchIndex',
  components: {
    SearchInput,
    SearchDefault
  }
}
</script>
<style lang="scss" scoped>

</style>
