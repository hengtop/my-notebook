<template>
  <div>
    <slot name="prev" :values="values">默认前置</slot>
    <div>doc:{{doc}}</div>
    <div>ddos:{{value}}</div>
    <div @click="handleClick">删除</div>
    <div v-if="!del">{{ title }}</div>
    <div v-else style="text-decoration: line-through">{{ title }}</div>
    <slot name="after">默认后置</slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "todoItem",
  props: {
    value:String,
    title: String,
    del: {
      type: Boolean,
      default: false,
    },
    doc:String
  },
  data() {
    return {
      values: Math.floor(Math.random() * 10),
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleClick() {
      console.log("点击删除");
      this.$emit("delete", this.title);
      this.$emit('update:doc', "修改成功~~~");
      this.$emit('input', "我修改成功了~~~")
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
</style>
