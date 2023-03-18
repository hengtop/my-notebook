import shop from "../../mock/product";
import { CART, PRODUCTS } from '../mutation-types'

export default {
  namespaced:true,
  state: {
    items: [],
    checkoutStatus: null
  },
  getters: {
    //已选中的物品
    cartProducts: (state, getters, rootState) => {
      return state.items.map(({ id, quantity }) => {
        console.log(rootState)
        const product = rootState.products.all.find(product => product.id === id)
        return {
          title: product.title,
          price: product.price,
          quantity
        }
      })
    },
    //计算总价
    cartTotalPrice: (state, getters) => {
      return getters.cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
    }
  },
  mutations: {
    //加入购物车
    [CART.PUSH_PRODUCT_TO_CART](state, { id, number }) {
      state.items.push({
        id,
        quantity: number
      })
    },
    [CART.SET_CART_ITEMS] (state, { items }) {
      state.items = items
    },
    //更新商品
    [CART.INCREMENT_ITEM_QUANTITY](state, { cartItem: { id }, number }) {
      const cartItem = state.items.find(item => item.id === id)
      cartItem.quantity += +number
    },
    //检查状态
    [CART.SET_CHECKOUT_STATUS] (state, status) {
      state.checkoutStatus = status
    }
  },
  actions: {
    //提交购物车,模拟有几率失败
    checkout ({ commit, state }, products) {
      //先保存要提交的购物车
      const savedCartItems = [...state.items]
      //初始化状态
      commit(CART.SET_CHECKOUT_STATUS, null)
      // empty cart
      commit(CART.SET_CART_ITEMS, { items: [] })
      shop.buyProducts(
        products,
        () => commit(CART.SET_CHECKOUT_STATUS, 'successful'),
        () => {
          commit(CART.SET_CHECKOUT_STATUS, 'failed')
          // rollback to the cart saved before sending the request
          commit({
            type:CART.SET_CART_ITEMS,
            items: savedCartItems 
          })
        }
      )
    },
  
    addProductToCart ({ state, commit }, {product, number}) {
      //初始化状态
      commit(CART.SET_CHECKOUT_STATUS, null)
      //是否有库存
      if (product.inventory > 0) {
        //是否已经添加
        const cartItem = state.items.find(item => item.id === product.id)
        if (!cartItem) {
          commit(CART.PUSH_PRODUCT_TO_CART, { id: product.id, number })
        } else {
          commit(CART.INCREMENT_ITEM_QUANTITY, {cartItem, number})
        }
        // 更新库存
        commit(`products/${PRODUCTS.DECREMENT_PRODUCT_INVENTORY}`, { id: product.id, number }, { root: true })
      }
    }
  }
}