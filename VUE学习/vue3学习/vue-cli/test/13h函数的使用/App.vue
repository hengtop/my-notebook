
<script>
import { ref, h } from "vue";
export default {
  setup() {
    const counter = ref(0);
    return () =>
      h(
        "div",
        {
          class: "app",
        },
        [
          // 这里this是可以取到setup中的返回值的
          h("h2", null, `当前计数: ${counter.value}`),
          h("button", { onclick: () => counter.value++ }, "+1"),
          h("button", { onclick: () => counter.value-- }, "-1"),
        ]
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
