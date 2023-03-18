const homeModule = {
  namespaced: true,
  state() {
    return {
      address:"sichaun",
      counter:20
    }
  },
  getters:{
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  mutations:{
    increment(state, payload) {
      console.log(payload);
      state.counter++;
    }
  },
  actions:{

  }
}

export default homeModule;