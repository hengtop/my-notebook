<template>
  <div class="">
    <input type="text" ref="input" />
    <input type="text" v-focus.aaa.bbb="123">
    <h2 v-format-time="'YYYY--MM--DD'">1478955216</h2>
    <h2 v-format-time>1478955216</h2>
     <h2 v-format-time>1478955216</h2>
      <h2 v-format-time>1478955216</h2>
  </div>
</template>

<script type="text/ecmascript-6">
import { ref, onMounted } from "vue";
export default {
 /*  directives: {
    focus: {
      mounted(el) {
        el.focus();
        console.log(el)
      },
    }
  }, */
  setup() {
    const input = ref(null);
    
    onMounted(() => {
      console.log(input.value)
      //input.value.focus();
    })
    return {
      input,
    };
  },
};
</script>

<style lang="less" scoped>
</style>

