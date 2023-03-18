<template>
    <div class="">
      <button @click="increment" ref="titleRef">加</button>
     <h2>--{{age}}</h2>
     <br>
     <input type="text" v-model="message">
     {{message}}
     <br>
     {{fullName}}
     <br>
     {{fullName2}}
    </div>
</template>

<script type="text/ecmascript-6">
import { watch, ref, reactive, readonly, toRefs, toRef, unref, computed, watchEffect } from "vue";
import useDebounceRef from "@/hook/useDebounceRef"
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
      const info = reactive({name:"zhang", age:18})
      //将对象中的所有属性转成ref，建立连接
      //let {name, age} = toRefs(info);
      //将单个属性转为ref 
      let age = toRef(info, "age");

      const message = useDebounceRef("hello wolrd");
      const firstName = ref("zhang");
      const lastName = ref("heng");
      //用法一传入一个getter，computed返回值是一个ref对象
      const fullName = computed(() => firstName.value + " " +lastName.value);
      //用法二传入一个对象，对象包含geter/setter
      const fullName2 = computed({
        get:() =>  firstName.value + "object" +lastName.value,
        set:(newValue) => {
           firstName.value = "hahha"  
        } 
      })
      
      //如何使用$ref
      const titleRef = ref(null);

      //函数会立即执行，会检查内部使用了那些响应式对象
      const stopWatch = watchEffect((onInvalidate) => {
        console.log("$refs:"+titleRef.value)
        console.log("age:"+age.value)
        //模拟网络请求
        let timer = setTimeout(() => {
          console.log("网络请求成功",timer)
        }, 2000);
        //取消副作用
        onInvalidate(() => {
          //做一些清除操作,清楚上一次的操作啥的
          //比如取消定时器，取消网络请求
          console.log("执行清除操作", timer)
          clearTimeout(timer)
        })
      }, {flush:"post"});//等到dom挂载完再执行

      //watch使用
      watch(info, (newValue, oldValue) => {
        console.log("new",newValue,'\n',"old",oldValue);
      })
       
      const increment = () => {
        info.name="我是谁？？？"
        age.value++;
        console.log(unref(age))
        lastName.value = "saber";
        fullName2.value = "lls";
        if(age.value > 25) {
          stopWatch();
        }
      }
      return {
        age,
        increment,
        message,
        fullName,
        fullName2,
        titleRef
      }
    }
}
</script>

<style lang="less" scoped>
</style>
