<template>
    <div class="">
      我是组件
      <button @click="btnClick">获取父组件</button>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name:'',
    data () {
        return {}
    },
    created () { },
    mounted () { },
    methods: {
      sayHello() {
        console.log("hello world")
      },
      btnClick() {
        //获取父组件
        console.log(this.$parent);
        //获取跟组件
        console.log(this.$root);
        //vue3已经移除了 $children 属性
      }
    },
    components: {}
}
</script>

<style lang="less" scoped>
</style>
