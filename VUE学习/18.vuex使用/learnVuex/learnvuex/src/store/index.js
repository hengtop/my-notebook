import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建对象
const store = new Vuex.Store({
  state:{
    counter:520,
    students:[
      {name:'saber',age:300,heigth:'154cm'},
      {name:'zhangheng',age:20,heigth:'162cm'},
      {name:'zhangheng',age:25,heigth:'162cm'},
      {name:'zhangheng',age:18,heigth:'162cm'}
    ],
    info:{
      name:'saberx',age:58,heigth:'156cm'
    }
  },
  //不要再mutations中进行异步操作
  mutations:{
    //方法
    //这里默认有个参数state
    increment(state){
      state.counter++;
    },
    decrement(state){
      state.counter--;
    },
    //这里有个疑惑就是在getters中定义的函数第二个参数默认就是getters但是这里就是自定义的参数了
    incrementCounter(state,counter){
      state.counter+=counter;
    },
    addStudent(state,stu){
      state.students.push(stu);
    },
    updateInfo(state){
      state.info.age="14";
    }
  },
  //在这里进行异步操作,但还是要拿给mutations处理，这里只是对异步操作多了一步处理
  actions:{
    /* updateInfo(context,payload){
      setTimeout(() => {
        context.commit('updateInfo');
        payload();
      }, 1000);
    } */
    //我觉得上边的写的不够优雅
    updateInfo(context,payload){
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          context.commit('updateInfo');
          console.log(payload.message,payload.success);
          resolve('6666');
        }, 1000);
      });
    }
    
  },
  //这个与计算属性类似
  getters:{
    powerCounter(state){
      return state.counter*state.counter; 
    },
    agedayu20(state) {
      return state.students.filter(s => s.age >= 20);
    },
    //这样的写法很妙，体会下，直接将getters传进来再调用agedayu20这个函数，这里的第二个参数默认是getters
    agedayu20number(state,getters){
      return getters.agedayu20.length;
    },
    //需求设置个获取年龄大于age（可变的）的
    agedayuage(state) {
      //将返回值设置成一个函数，然后再传入一个值
     /*  return function(age){
        return state.students.filter(s => s.age >= age);
      } */
      /*改用箭头函数*/
      return age => state.students.filter(s => s.age >= age);
    }
  },
  //这个就是一个模块里面还是有state，mutations等，
  modules:{
   
  }
});


//3.导出
export default store
