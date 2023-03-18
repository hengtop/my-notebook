<template>
  <div class="">
    <hr />
    <h2>Home</h2>
    <h3>composition:{{counter}}</h3>
    <h3>address:{{ $store.state.home.address }}---{{address}}</h3>
    <h3>counter:{{ $store.state.home.counter }}</h3>
    <h3>doubleCounter:{{ $store.getters['home/doubleCounter'] }}</h3>
    <button @click="add">+</button>
    <button @click="increment">+</button>
  </div>
</template>

<script type="text/ecmascript-6">
import {useState} from "../hook/index"
import {createNamespacedHelpers } from "vuex"
const {mapState, mapGetters, mapActions, mapMutations} = createNamespacedHelpers('home')
export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed:{
    ...mapState(['address'])
  },
  methods: {
    add() {
      //如果没有表明执行哪个模块的commit，默认所有的模块都会执行同名commit
      this.$store.commit("increment");
    },
    ...mapMutations(['increment'])
  },
  setup() {
    const homeCounter = useState(['counter'], 'home')
    return {
        ...homeCounter
    }
  },
  components: {},
};
</script>

<style lang="less" scoped>
</style>
