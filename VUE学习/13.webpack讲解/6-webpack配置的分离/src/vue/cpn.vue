<template>
  <div class="page">
    <h2>我是cpn组件的标题</h2>
    <p>hhhhhhhhh</p>
    <h2>{{name}}</h2>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name:'cpn',
  data() {
    return {
      name:"cpn中的组件name"
    }
  },
  methods: {
    btnClick(){

    }
  },
}
</script>

<style scoped lang="stylus">
</style>
