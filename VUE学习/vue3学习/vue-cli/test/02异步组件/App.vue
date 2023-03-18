<template>
  <div>
    <AsyncCom></AsyncCom>
    <suspense>
     <template #default>
       <div>
         正常组件
       </div>
     </template>
     <template #fallback>
       <div>
         加载失败组件
       </div>
     </template>
    </suspense> 
  </div>
  <someCon></someCon>
</template>

<script>

import { defineAsyncComponent } from "vue"
const someCon = defineAsyncComponent(() => import(/* webpackChunkName: 'someCon' */"./components/someCom.vue"))
//第一中写法
//const AsyncCom = defineAsyncComponent(() => import("@/components/asyncCom.vue"));
//第二种写法
const AsyncCom = defineAsyncComponent({
  loader:() => import(/* webpackChunkName: 'asyncCom' */"@/components/asyncCom.vue"),
  //loadingComponent:"xxx"//占位组件，在异步组件未加载出来是的
  //errorComponent:"xxx"//加载失败显示组件
  //delay:2000//延时显示组件
  //onEror:function(err, retry, fail, attempts){}//错误回调函数，可以尝试重新加载和重新加载次数
})
export default {
  name: 'App',
  components: {
    AsyncCom,
    someCon
  }
}
</script>

<style>

</style>
