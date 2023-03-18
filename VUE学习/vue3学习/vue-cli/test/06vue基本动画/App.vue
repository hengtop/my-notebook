<template>
  <button @click="toggle">显示/隐藏</button>
  <!-- 如果我们遇到切换元素执行过度，下面两个h2切换会有问题，我们需要为其设置过渡模式 -->
  <transition name="fade" mode="out-in">
    <h2 v-if="isShow">hello world</h2>
    <h2 v-else>你好 世界</h2>
  </transition>
  <!-- 动画 -->
  <home></home>
  <!-- 组件的过渡 -->
  <transition name="fade" mode="out-in">
    <component :is="isShow? 'profile' : 'about'"></component>
  </transition>
</template>

<script>
import home from "@/components/home.vue";
import about from "@/components/pages/about";
import profile from "@/components/pages/profile";
export default {
  name: "App",
  components: {
    home,
    about,
    profile
  },
  data() {
    return {
      isShow: "true",
    };
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* 下面这些类可以不设置，因为默认opacity就是1 */
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
