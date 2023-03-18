<template>
  <div class="border2">
    <!-- 获取dom元素 -->
    <h3 v-ant-ref="c => setChildrenRef('getEDOM', c)">
      E 结点
    </h3>
  </div>
</template>
<script>
export default {
  components: {},
  inject: {
    setChildrenRef: {
      default: () => {}
    }
  }
};
</script>
