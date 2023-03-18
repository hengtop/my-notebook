<template>
  <button @click="isShow = !isShow">开始动画</button>
  <transition name="zhang">
    <h2 v-if="isShow">你好啊</h2>
  </transition>
  <!-- 自定义class比name优先级高 -->
  <transition
    enter-active-class="animate__animated animate__bounceOutUp"
    leave-active-class="animate__animated animate__bounceOutUp re"
  >
    <h2 v-if="isShow">你好啊2</h2>
  </transition>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      isShow: true,
    };
  },
};
</script>

<style scoped>
.zhang-enter-active {
  animation: shakeX 1s ease-in;
}
.zhang-leave-active {
  animation: shakeX 1s ease-in reverse;
}
.re{
  animation-direction: reverse;
}
</style>
