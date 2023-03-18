<template>
    <div class="">
      composition组件
      {{message}}--{{title}}
      <!-- ref是浅层解包，当把ref放到一个对象中再使用，模板是不会对其解包的 -->
      <!-- 但是最外城包裹的是一个reactive对象，那ref是可以解包的 -->
      {{counterState.counter}}--{{counterState.name}}
      <br>
      {{nameState.name}}
      <button @click="increment">点击</button>
      <br>
      {{readOnlyInfo.name}}---{{readOnlyInfo2.name}}---{{readOnlyInfo3}}
    </div>
</template>

<script type="text/ecmascript-6">
import { ref, reactive, readonly } from "vue"
export default {
    name:'compositionDemo',
    props:{
      name:{
        type:String,
        default:""
      },
      age:{
        type:Number,
        default:10
      }
    },
    setup(props, context) {
      console.log(props, context);
      //响应式处理
      const name = ref("zhangsan");
      const counterState = reactive({
        counter:100,
        name
      });
      const nameState = reactive({ name });
      //普通对象
      const info = {name:"lilisi"};
      const readOnlyInfo = readonly(info);
      //reactive
      const info2 = reactive({name:"wang"});
      const readOnlyInfo2 = readonly(info2);
      //ref
      const info3 = ref("saber");
      const readOnlyInfo3 = readonly(info3);
      const increment = () => {
        counterState.counter++;
        console.log(name.value)
        console.log(nameState.name)
        info.name = "sabesssr";
        readOnlyInfo2.name = "haha";
        readOnlyInfo3.value = "sabers";
        name.value = "hello world";
      }
     
        
      return {
        message:"hello setup",
        title:"zhang",
        increment,
        counterState,
        nameState,
        readOnlyInfo,
        readOnlyInfo2,
        readOnlyInfo3
      }
    }
}
</script>

<style lang="less" scoped>
</style>
