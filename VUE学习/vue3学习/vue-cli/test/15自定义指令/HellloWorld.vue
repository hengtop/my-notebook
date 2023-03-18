
<script type="text/ecmascript-6">
import { h } from "vue"
export default {
  render() {
    return h("div", null, [
      h("h2", null,  "hello world"),[
        this.$slots.default ? this.$slots.default({name:"zhangsan"}):h("h2", null, "我是默认插槽"),
        this.$slots.usejsx()
      ]
      
  ]);
  }
}
</script>

<style lang="less" scoped>
</style>
