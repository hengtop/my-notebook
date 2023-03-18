<template>
  <div>
    <h2>App</h2>
    <h3>root:{{$store.state.rootCounter}}</h3>
    <Home></Home>
    <User></User>
  </div>
</template>

<script>
import Home from "@/views/Home.vue";
import User from "@/views/User.vue";
export default {
  components: {
    Home,
    User,
  },
};
</script>

<style>
</style>
