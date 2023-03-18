import { createStore } from "vuex";
import homeModule from "./modules/home";
import userModule from "./modules/user";

const store = createStore({
  state() {
    return {
      rootCounter: 12356,
    };
  },
  mutations: {
    increment(state) {
      state.rootCounter++;
    },
  },
  actions: {
    
  },
  modules: {
    home: homeModule,
    user: userModule,
  },
});

export default store;
