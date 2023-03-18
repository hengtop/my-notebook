import Vue from "vue";
import Vuex from "vuex";
import foo from "./modules/foo";
import bar from "./modules/foo";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    foo,
    bar
  },
  state: {
    count: 2333,
    todoList: [
      { id: 1, text: "吃饭", done: true },
      { id: 2, text: "睡觉", done: false },
      { id: 3, text: "打六花", done: true },
      { id: 4, text: "写代码", done: true }
    ]
  },
  getters: {
    done(state) {
      return state.todoList.filter(todo => todo.done).length;
    },
    getTodoById: state => id => {
      return state.todoList.find(todo => todo.id === id);
    }
  },
  mutations: {
    increment(state, payload) {
      console.log(payload.add);
      state.count += payload.add;
    }
  },
  actions: {
    increment({ commit }, { add = 5 }) {
      setTimeout(() => {
        commit({
          type: "increment",
          add
        });
      }, 1000);
    }
  }
});

export default store;
