<template>
  <div id="app">
    <h2>APP内容</h2>
    <h2>{{$store.state.counter}}</h2>
   <h2>{{message}}</h2>
   <h2>{{counter}}</h2>
                  <!--官方不推荐这样直接改-->
   <button @click="$store.state.counter++">+</button>
   <button @click="$store.state.counter-- ">-</button>
   <h2>官方推荐的修改方法</h2>
   <button @click="add">+</button>
   <button @click="sub">-</button>
   <button @click="addCounter(5)">+5</button>
   <button @click="addCounter(10)">+10</button>
   <button @click="addStudent">增加学生</button>
  <!--  <helloVuex :counter="counter"></helloVuex> -->

  <h2>演示getters</h2>
  <h2>{{$store.getters.powerCounter}}</h2>

  <h2>组件内容</h2>
   <helloVuex></helloVuex>

   <h2>输出大于20岁的数组对象（第一行使用vue中的计算属性，第二行使用vuex中的getters）</h2>
   <h2>{{agedayu20}}</h2>
   <h2>{{$store.getters.agedayu20}}</h2>

   <h2>获取大于二十岁的个数</h2>
   <h2>{{$store.getters.agedayu20number}}</h2>

   <h2>获取大于age的数组对象</h2>
   <h2>{{$store.getters.agedayuage(25)}}</h2>

   <h2>下面是演示异步操作的代码</h2>
   <button @click="updateInfo">返老还童</button>
   <h2>{{$store.state.info.age}}</h2>
  </div>
</template>

<script>
import helloVuex from './components/helloVuex'

export default {
  name: 'App',
  data() {
    return {
      message:'zhangsan',
      counter:0
    }
  },
  computed: {
    agedayu20(){
      return this.$store.state.students.filter(s => s.age >=20 );
    }
  },
  methods: {
    add(){
      //通过这样的方式来使用mutations中定义的方法
      this.$store.commit('increment');
    },
    sub(){
      this.$store.commit('decrement')
    },
    addCounter(counter){
      //将参数传过去(这个参数专业名词叫做payload（负载）)
      this.$store.commit('incrementCounter',counter)
    },
    //多个参数传入问题，可以传一个对象
    addStudent(){
      const stu={name:'xiaoxi',age:20,heigth:'179cm'}
      this.$store.commit('addStudent',stu)
    },
    updateInfo(){
      //这里要使用dispatch来通过actions进行异步处理操作，也可以传递参数,函数和对象都可以传过去
     /*  this.$store.dispatch('updateInfo',() => {
        console.log('你已经修改成功！')
      }); */
     
    //但是我觉得上面的代码不够优雅
    this.$store.dispatch('updateInfo',{
      message:"我是信息",
      success:"修改成功了"
    }).then(res => {
      console.log(res);
    });//这里可以接then的原因就是上面dispatch调用updateInfo返回的就是new Promise所以可以在后面接上then
   }
  },
  components: {
    helloVuex
  }
}
</script>

<style>

</style>
