<template>
  <div>{{message}}</div>
  <home v-if="isShow"></home>
  <button @click="changeMessage">点击切换</button>
</template>

<script>
  import home from "@/components/home"
export default {
  name: "App",
  components: {
    home
  },
  data() {
    return {
      message:123,
      isShow:true
    }
  },
  methods: {
    changeMessage() {
      this.message = "hello world"
      this.isShow = !this.isShow;
    }
  },
  beforeCreate() {
    console.log("before create");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("before mount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUnmount() {
    console.log("before unmount");
  },
  unmounted() {
    console.log("unmounted");
  },
  beforeUpdate() {
    console.log("before update");
  },
  updated() {
    console.log("update");
  },
};
</script>

<style>
</style>
