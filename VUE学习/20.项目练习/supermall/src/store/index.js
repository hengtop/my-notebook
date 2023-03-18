import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//安装插件
Vue.use(Vuex)

const state = {
  cartList: [],
  flag:false 
}

const store = new Vuex.Store({
  state,
  mutations,//这个里面尽量处理简单的事情
  actions,//进行复杂的或者一些异步的操作(这里多进行了一部操作)
  getters
});

export default store