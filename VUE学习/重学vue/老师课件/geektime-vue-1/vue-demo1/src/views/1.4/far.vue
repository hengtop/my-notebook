<template>
  <div class="">
    far组件 {{ shareCount }}
    <button @click="handleCount">+</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Far",
  components: {},
  data() {
    return {
      count: 0,
    };
  },
  computed:{
    shareCount(){
      return this.$store.state.count;
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleCount() {
      this.count++;
    },
  },
};
</script>

<style lang="less" scoped></style>
