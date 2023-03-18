<template>
  <div>
    <home v-model="name" v-model:age="age"></home>
    {{name}}----{{age}}
  </div>
</template>

<script>

import home from "@/components/home.vue"
export default {
  name: 'App',
  data() {
    return {
      name:'zhangsan',
      age:18
    }
  },
  components: {
    home
  }
}
</script>

<style>
</style>
