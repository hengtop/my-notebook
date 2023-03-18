<template>
  <div>
    <h2 ref="title">组件实例</h2>
    <button @click="btnClick">获取组件实例</button>
    <navBar ref="nav-bar"></navBar>
  </div>
</template>

<script>
  import navBar from "@/components/navBar.vue";
export default {
  name: "App",
  components: {
    navBar
  },
  methods: {
    btnClick() {
      console.log(this.$refs.title);
      console.log(this.$refs["nav-bar"].sayHello());
      console.log(this.$refs["nav-bar"].$el);//获取组件根元素
    },
  },
};
</script>

<style>
</style>
