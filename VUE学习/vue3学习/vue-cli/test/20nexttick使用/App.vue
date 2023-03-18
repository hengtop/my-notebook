<template>
  <div>
    <button @click="addMessage">+</button>
    <h2 ref="titleRef">{{ message }}</h2>
  </div>
</template>

<script>
import { ref, onUpdated, nextTick } from "vue";
export default {
  setup() {
    const message = ref("哈哈哈");
    const titleRef = ref(null);
    const addMessage = () => {
      message.value += "哈哈哈哈哈";
      nextTick(() => {
        console.log(titleRef.value.offsetHeight);
      });
    };
    /*  onUpdated(() => {
      console.log(titleRef.value.offsetHeight);
    }); */

    return {
      message,
      addMessage,
      titleRef,
    };
  },
};
</script>

<style>
h2 {
  width: 120px;
}
</style>
