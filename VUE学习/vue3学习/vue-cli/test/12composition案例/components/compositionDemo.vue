<template>
  <div class="">
    <button @click="increment">加</button><br />
    <button @click="decrement">减</button><br />
    {{ counter }}---{{ doubleCounter }}
    <br>
    {{data}}
    <div class="content"></div>
    <div class="scroll">
      <span class="scroll-x">x:{{ scrollX }}</span
      ><br />
      <span class="scroll-y">y:{{ scrollY }}</span>
      <div>鼠标位置：{{mouseX}}--{{mouseY}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import useCounter from "@/hook/useCounter";
import useTitle from "@/hook/useTitle";
import useScrollPosition from "@/hook/useScrollPosition";
import useMousePosition from "@/hook/useMousePosition";
import useLocalStorage from "@/hook/useLocalStorage"
export default {
  name: "compositionDemo",
  props: {
    name: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      default: 10,
    },
  },
  setup(props, context) {
    const { counter, doubleCounter, increment, decrement } = useCounter();
    const titleRef = useTitle("saber");
    setTimeout(() => {
      titleRef.value = "ahhhhhh~~~";
    }, 3000);

    //滚动位置
    const { scrollX, scrollY } = useScrollPosition();
    //鼠标位置
    const { mouseX, mouseY } = useMousePosition();
    const data = useLocalStorage("saber", "my girlFriend");
    return {
      counter,
      doubleCounter,
      increment,
      decrement,
      scrollX,
      scrollY,
      mouseX,
      mouseY,
      data
    };
  },
};
</script>

<style scoped>
.content {
  width: 3000px;
  height: 5000px;
}
.scroll {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
