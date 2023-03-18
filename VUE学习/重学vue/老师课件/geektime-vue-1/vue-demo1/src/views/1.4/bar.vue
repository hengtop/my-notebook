<template>
  <div class="">
    foo模块的状态{{a}}
    <br>
    bar组件 {{ counts }}
    已完成{{done}}
    通过id获取 {{getTodoById(3).text}}
    <button @click="handleCount">+</button>
    <button @click="asyncHandleCount">异步+</button>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapGetters, mapMutations } from "vuex"
export default {
  name: "bar",
  data() {
    return {
    };
  },
  computed: {
    shareCount() {
      //不要直接通过state直接修改,因为不会被调试工具检测到
      return this.$store.state.count;
    },
    //默认映射全局
    ...mapState({counts:'count'}),
    ...mapState('foo', ['a']),
    ...mapGetters(['done', 'getTodoById']),
  },
  created() {},
  mounted() {},
  methods: {
    handleCount() {
      //this.count++;
      /* this.$store.commit({
        type:'increment',
        add:2
      }); */
      this.increment({add:2})
    },
    asyncHandleCount(){
      this.$store.dispatch('increment', {
        add:100
      })
    },
    ...mapMutations(['increment'])

  },
  components: {},
};
</script>

<style lang="less" scoped>
</style>
