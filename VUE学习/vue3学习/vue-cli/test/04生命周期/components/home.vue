<template>
  <div class="" ref="title">我是home组件</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      args:[1,2,3,4]
    };
  },
  created() {},
  mounted() {},
  beforeUnmount() {
    console.log("home before unmount");
  },
  unmounted() {
    console.log(this.args);
    console.log("home unmounted");
  },
  methods: {},
  components: {},
};
</script>

<style lang="less" scoped>
</style>
