<template>
  <div class="border1">
    <h2>C 结点</h2>
    <ChildrenE />
    <ChildrenF />
  </div>
</template>
<script>
import ChildrenE from "./ChildrenE";
import ChildrenF from "./ChildrenF";
export default {
  components: {
    ChildrenE,
    ChildrenF
  },
  ///下层节点冒泡上来找到provide后就不会继续网上找了
  provide() {
    return {
      theme: {
        color: "green"
      }
    };
  }
};
</script>