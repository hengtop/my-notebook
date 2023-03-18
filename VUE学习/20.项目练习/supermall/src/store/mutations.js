export default {
  addCounter(state, payload) {
    payload.count++;
  },
  addToCart(state, payload) {
    state.cartList.push(payload);
  },
  _allChecked(state,paylod){
    state.flag = paylod;
  }

}