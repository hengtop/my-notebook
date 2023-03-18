<template>
  <div>
    <p>props.info: {{ info }}</p>
    <p>props.name: {{ name }}</p>
    <p>props.list: {{ list }}</p>
    <p>data.a: {{ a }}</p>
    <p>
      <button @click="handleBChange">change data.b</button>
    </p>
  </div>
</template>
<script>
export default {
  name: "PropsAndData",
  props: {
    info: Object,
    name: String,
    list: Array
  },
  data() {
    return {
      a: "hello",
      b: "world"
    };
  },
  updated() {
    console.log("触发 PropsAndData updated");
  },
  methods: {
    handleBChange() {
      this.b = "vue" + Date.now();
      //在视图上并没有被渲染
      console.log("data.b 发生了变化，但是并没有触发组件更新", this.b);
    }
  }
};
</script>
