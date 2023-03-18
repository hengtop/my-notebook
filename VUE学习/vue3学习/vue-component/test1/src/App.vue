<template>
  <div>
    <Header class="name" @add="add"></Header>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { computed } from "vue"
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      length:123
    }
  },
  provide() {
    return {
      name: "zhangsan",
      length: computed(() => this.length)
    };
  },
  methods: {
    add() {
      console.log("阿斯顿哇塞的");
    },
  },
};
</script>

<style>
</style>
