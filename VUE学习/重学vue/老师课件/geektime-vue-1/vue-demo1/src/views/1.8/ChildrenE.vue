<template>
  <div class="border2">
    <h3 :style="{ color: theme.color }">E 结点</h3>
    <button @click="handleClick">改变color为red</button>
  </div>
</template>
<script>
export default {
  components: {},
  inject: {
    theme: {
      default: () => ({})
    }
  },
  methods: {
    handleClick() {
      if (this.theme.changeColor) {
        this.theme.changeColor("red");
      } else {
        console.log("meiyou ");
      }
    }
  }
};
</script>
