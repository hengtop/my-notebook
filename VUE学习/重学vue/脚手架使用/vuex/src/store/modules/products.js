import shop from "../../mock/product";
import { PRODUCTS } from "../mutation-types";


export default {
  namespaced:true,
  state: {
    all: []
  },
  getters: {

  },
  mutations: {
    [PRODUCTS.SET_PRODUCTS](state, products) {
      state.all = products
    },
    //更新库存
    [PRODUCTS.DECREMENT_PRODUCT_INVENTORY] (state, { id, number }) {
      const product = state.all.find(product => product.id === id)
      product.inventory -= number
    }
  },
  actions: {
    //获取商品
    getAllProducts({ commit }) {
      shop.getProducts(products => {
        commit(PRODUCTS.SET_PRODUCTS, products)
      })
    }
  }
}