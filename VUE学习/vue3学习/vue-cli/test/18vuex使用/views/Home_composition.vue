<template>
  <hr />
  <h1>setup中使用vuex</h1>
  <div>{{ sCounter }}</div>
  <h2>{{ counter }}</h2>
  <h2>原价:<del>{{$store.getters.totalPrice/discount}}</del> 折后价格：{{$store.getters.totalPrice}}</h2>
  <h2>折扣:{{discount}}</h2>
  <button @click="increment">+</button><button @click="decrement()">-</button>
  <button @click="incrementAction({count:50})">异步-</button>
  <hr />
</template>

<script>
import { useStore, mapMutations, mapActions } from "vuex";
import { computed } from "vue";
import { useState, useGetters } from "../hook";
import { INCREMENT, DECREMENT } from "@/store/mutation-types";
export default {
  setup() {
    const store = useStore();
    //传统使用
    const sCounter = computed(() => store.state.counter);
    //map辅助函数封装使用
    const sDiscount = useGetters(['discount']);
    const storeState = useState(["counter"]);
    const storeMutations = mapMutations([INCREMENT, DECREMENT]);
    const storeActions = mapActions(['incrementAction'])
    return {
      sCounter,
      ...storeState,
      ...sDiscount,
      ...storeMutations,
      ...storeActions
    };
  },
};
</script>

<style scoped>
</style>
