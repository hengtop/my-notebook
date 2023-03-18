<template>
  <div class="" @click="homeClick"> 
    home组件
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'home',
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
  emits:['pageClick'],
  data () {
      return {}
  },
  created () { },
  mounted () { },
  methods: {
    homeClick() {
      this.$emit('pageClick', 123);
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
</style>
