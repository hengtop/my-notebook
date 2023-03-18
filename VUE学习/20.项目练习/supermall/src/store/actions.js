export default {
  addCart(context, payload) {
    //判断相同的物品重复加入
    /* let oldProduct = null;
    for(let item of state.cartList){
      if (item.iid == payload.iid) {
        oldProduct = item;
      }
    } */
    //另一种方法
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)//这里的oldProduct是指向原来的对象的
      if (oldProduct) {
        context.commit('addCounter', oldProduct);
        //已添加的商品数量加1
        resolve("已有商品数量加一");
      }
      else {
        payload.count = 1;
        payload.checked = false;
        //context.state.cartList.push(payload);
        context.commit('addToCart', payload);
        //新加入商品
        resolve("商品加一");
      }
    })

  }
}