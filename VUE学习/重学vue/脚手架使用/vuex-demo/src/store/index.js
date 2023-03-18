import Vue from 'vue'
import Vuex from './min-vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }//
  },
/*    actions: {
     increment ({ commit }) {
       setTimeout(() => {
         commit('increment')
       }, 1200)
     }
   }, */
   // 类似计算属性起到缓存作用
   getters: {
     doubleCount (state) {
       return state.count * 2
     }
   },
   modules: {
   }
})
