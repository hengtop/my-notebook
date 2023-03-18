<template>
  <button @click="isShow = !isShow">开始动画</button>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <h2 v-if="isShow">hello world</h2>
  </transition>
  <cinput></cinput>
</template>

<script>
import cinput from "@/components/cinput.vue";
import gasp from "gsap";
export default {
  name: "App",
  components: {
    cinput,
  },
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    beforeEnter() {
      console.log("beforeEnter");
    },
    enter(el, done) {
      console.log("enter");
      gasp.from(el, {
        x: 200, //等于translateX
        duration: 2,
        onComplete: done,
      });
      // done()这个函数如果不调用vue会自动同步调用，不会管动画是否执行完
    },
    afterEnter() {
      console.log("afterEnter");
    },
    beforeLeave() {
      console.log("beforeLeave");
    },
    leave(el, done) {
      console.log("leave");
      gasp.to(el, {
        x: 200, //等于translateX
        duration: 2,
        onComplete: done,
      });
    },
    afterLeave() {
      console.log("afterLeave");
    },
  },
};
</script>

<style>
</style>
