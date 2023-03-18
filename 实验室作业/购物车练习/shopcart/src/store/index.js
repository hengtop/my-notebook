import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    shopCart: [],
    shopList: [
      {
        title: "vue从入门到入土",
        price: 9999,
        number: 1
      },
      {
        title: "C艹从入门到放弃",
        price: 19999,
        number: 1
      }
    ]
  },
  //不要再mutations中进行异步操作
  mutations: {

  },
  //在这里进行异步操作,但还是要拿给mutations处理，这里只是对异步操作多了一步处理
  actions: {

  },
  //这个与计算属性类似
  getters: {
  },
  modules: {

  }
});


//3.导出
export default store
