<template>
  <compositionDemo :name="name" :age="age"></compositionDemo>
</template>

<script>
  import compositionDemo from "@/components/compositionDemo.vue"
import { demoMixin } from "./mixins/demoMixins";
export default {
  mixins:[demoMixin],
  name: 'App',
  data() {
    return {
      name:"zhangsan",
      age:18
    }
  },
  components: {
    compositionDemo
  }
}
</script>

<style>

</style>
