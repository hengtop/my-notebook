<template functional>
  <div class="border2">
    <!-- 函数式组件取得inject的方式,因为没有上下文 -->
    <h3 :style="{ color: injections.theme.color }">I 结点</h3>
  </div>
</template>
<script>
export default {
  inject: {
    theme: {
      default: () => ({})
    }
  }
};
</script>
