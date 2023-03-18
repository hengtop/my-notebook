<template>
  <div id="app">
    {{ count }}
    {{ $store.getters.doubleCount }}
    <button @click="$store.commit('increment')">加一</button>
    <!-- <button @click="$store.dispatch('increment')">异步加一</button> -->
    <!-- <componentA v-for="(item, index) in 3" :key="index" /> -->
    
  </div>
</template>

<script>
import componentA from '@/components/ComponentA'
export default {
  name: 'app',
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  components:{
    componentA
  }
}
</script>

<style lang="less">
</style>
