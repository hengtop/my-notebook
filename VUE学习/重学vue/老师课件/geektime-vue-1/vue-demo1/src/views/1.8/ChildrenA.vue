<template>
  <div class="border">
    <h1>A 结点</h1>
    <button @click="() => changeColor()">改变color</button>
    <ChildrenB />
    <ChildrenC />
    <ChildrenD />
  </div>
</template>
<script>
import ChildrenB from "./ChildrenB";
import ChildrenC from "./ChildrenC";
import ChildrenD from "./ChildrenD";
export default {
  components: {
    ChildrenB,
    ChildrenC,
    ChildrenD
  },
  // provide() {
  //   return {
  //     theme: {
  //       //这里设置的color不是响应式的
  //       color: this.color
  //     }
  //   };
  // },
  //下面就能实现响应式(提供了响应式的数据)
  provide() {
    return {
      theme: this
    };
  },
  data() {
    return {
      color: "blue"
    };
  },
  methods: {
    changeColor(color) {
      if (color) {
        this.color = color;
      } else {
        this.color = this.color === "blue" ? "red" : "blue";
      }
    }
  }
};
</script>
