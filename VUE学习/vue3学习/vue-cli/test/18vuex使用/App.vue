<template>
  <div>
    <Home></Home>
    <h2>{{ sCounter }}</h2>
    <button @click="increment">+</button>
    <button @click="decrement(1000)">-</button>
    <button @click="incrementAction({count:50})">异步-</button>
    <br />
    <HomeC></HomeC>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { INCREMENT, DECREMENT } from "@/store/mutation-types";
import Home from "@/views/Home.vue";
import HomeC from "@/views/Home_composition.vue";
export default {
  data() {
    return {
      message: "zhangsan",
    };
  },
  computed: {
    ...mapState({
      sCounter: "counter",
    }),
  },
  methods: {
    ...mapMutations([INCREMENT, DECREMENT]),
    ...mapActions(['incrementAction'])
  },

  components: {
    Home,
    HomeC,
  },
};
</script>

<style>
</style>
