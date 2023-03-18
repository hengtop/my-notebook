
<script>
import { isRef, triggerRef, shallowRef, ref, h, isProxy, reactive, readonly, isReactive, isReadonly, toRaw} from "vue";
import HelloWorld from "./HellloWorld.vue"
import usejsx from "./usejsx.vue"
export default {
  setup() {
    const read = shallowRef({name:"zhangsan"});
    setTimeout(() => {
      read.value.name = "lls";
      triggerRef(read);
      console.log(read.value)
    }, 5000)
    return () =>
      h(
       HelloWorld,
       null,
       {
         default:props => h("span", null, `${read.value.name} app传入到组件中的内容${props.name}`),
         usejsx: props => h(usejsx, null)
       }
      );
  },
  //setup也是可以代替render函数的
  /*   render() {
    return h(
      "div",
      {
        class: "app",
      },
      [
        // 这里this是可以取到setup中的返回值的 
        h("h2", null, `当前计数: ${this.counter}`),
        h("button", {onclick:() => this.counter++}, "+1"),
        h("button", {onclick:() => this.counter--}, "-1"),
      ]
    );
  }, */
};
</script>

<style>
</style>
