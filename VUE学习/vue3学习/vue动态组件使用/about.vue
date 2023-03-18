<template>
    <div class="">
      about组件
      <button @click="add">{{counter}}</button>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name:'about',
    props:{
    name:{
      type:String,
      deafult:""
    },
    age:{
      type:Number,
      deafult:18
    }
  },
    data () {
        return {
          counter:0
        }
    },
    created () { },
    mounted () { },
    methods: {
      add() {
        this.counter++;
      }
    },
    components: {}
}
</script>

<style lang="less" scoped>
</style>
