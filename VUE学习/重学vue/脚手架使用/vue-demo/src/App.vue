<template>
  <div id="app">
    <input type="text" v-model="message">
    <!-- v-model就是简写属性,本质上还是单项数据流 -->
    <input type="text" :value="message" @input="handleChange">
    {{message}}
    <todoList>
      <todoItem
        @delete="handleDelete"
        v-for="(item, index) in list"
        :title="item.title"
        :del="item.del"
        :key="index"
        v-model="ddos"
        :doc.sync="doc"
        data-set="组件根节点属性"
      >
        <!-- 
            以下写法已经废弃
          <span slot="prev">prev</span>
        <span slot="after">after</span> -->
        <!-- 可以通过这种方式使用子组件中的数据来设置具体要设置那种插槽 -->
        <template v-slot:prev="{ values }">
          <span> newPrev {{ values }} </span>
        </template>
        <template v-slot:after>
          <span> newAfter </span>
        </template>
      </todoItem>
    </todoList>
  </div>
</template>

<script>
import todoList from "./components/todoList";
import todoItem from "./components/childComponent/todoItem";
export default {
  name: "App",
  data() {
    return {
      message: "hello vue",
      list: [
        {
          title: "课程1",
          del: false,
        },
        {
          title: "课程2",
          del: true,
        },
        {
          title: "课程3",
          del: false,
        },
      ],
      doc:"双向绑定",
      ddos:'唯一双向绑定'
    };
  },
  methods: {
    handleDelete(title) {
      alert("delete" + title);
    },
    handleChange(e){
      this.message=e.target.value;
    }
  },
  components: {
    todoList,
    todoItem,
  },
};
</script>

<style>
</style>
