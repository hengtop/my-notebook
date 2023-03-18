<template>
  <div @click="btnClick">
    <h2 class="title">{{message}}</h2>
    <cpn/>
  </div>
</template>

<script type="text/ecmascript-6">
import cpn from './cpn.vue'
export default {
 name:'app',
  data(){
    return {
      message:"zhanghengVuexiefa"
    }
  },
  methods: {
    btnClick(){
      console.log("new的写法");
    }
  },
  components:{
    cpn
  }
};
</script>

<style scoped>
  .title{
    color: green;
  }
</style>
