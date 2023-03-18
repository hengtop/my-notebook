import { createStore } from "vuex";
import { INCREMENT, DECREMENT } from "./mutation-types";
const store = createStore({
  state() {
    return {
      counter: 100,
      books: [
        { name: "三体", price: 200, count: 2 },
        { name: "空之境界", price: 108, count: 3 },
        { name: "冰菓", price: 300, count: 1 },
      ],
    };
  },
  getters: {
    totalPrice(state, getters) {
      return (
        state.books.reduce((total, item) => {
          return total + item.price * item.count;
        }, 0) * getters.discount
      );
    },
    discount() {
      return 0.5;
    },
  },
  mutations: {
    [INCREMENT](state) {
      state.counter++;
    },
    [DECREMENT](state, payload = 10) {
      console.log(payload);
      state.counter -= payload;
    },
  },
  actions: {
    incrementAction(context, { count }) {
      console.log(context);
      setTimeout(() => {
        context.commit("decrement", count);
      }, 2000);
    },
  },
});

export default store;
