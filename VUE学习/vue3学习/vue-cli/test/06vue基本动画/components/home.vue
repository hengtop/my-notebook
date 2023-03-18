<template>
  <button @click="isShow = !isShow">动画</button>
  <transition name="zhang">
    <div v-if="isShow" class="box1"></div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      isShow:true
    };
  },
  created() {},
  mounted() {},
  methods: {},
  components: {},
};
</script>

<style scoped>
  /* 动画使用 */
.box1 {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: blueviolet;
  margin: 0 auto;
}
.zhang-enter-active {
  animation: bounce 1s ease;
}
.zhang-leave-active {
  animation: bounce 1s ease reverse;
}
@keyframes bounce {
  0% {
    transform: scale(0);
  }
  33% {
    transform: scale(.33);
  }
  66% {
    transform: scale(.66);
  }
  100% {
    transform: scale(1);
  }
}
</style>
