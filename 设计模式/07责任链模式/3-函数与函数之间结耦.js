function order500(orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500元定金')
  } else {
    return 'next'
  }
}


function order200(orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金')
  } else {
    return 'next'
  }
}

function order300(orderType, pay, stock) {
  if (orderType === 4 && pay === true) {
    console.log('300元定金')
  } else {
    return 'next'
  }
}


function orderNormal(orderType, pay, stock) {
  if (stock > 0) {
    console.log("普通购买")
  } else {
    console.log('没了 -----')
  }
}

class Chain {
  constructor(fn) {
    this.fn = fn;
    this.successor = null;
  }
  setNextSuccessor(successor) {
    // 指定下一个节点
    return this.successor = successor;
  }
  passRequest(...args) {
    // 传递给某个节点
    const ret = this.fn(...args);
    // 处理不了
    if (ret === 'next') {
      return this.successor &&
        this.successor.passRequest.apply(this.successor, args)
    }
    return ret;
  }
}

const chainOrder500 = new Chain(order500);
const chainOrder200 = new Chain(order200);
const chainOrder300 = new Chain(order300);
const chainOrderNormal = new Chain(orderNormal);

chainOrder500
  .setNextSuccessor(chainOrder200)
  .setNextSuccessor(chainOrder300)
  .setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500)
chainOrder500.passRequest(1, false, 500)
chainOrder500.passRequest(1, false, 0)

chainOrder500.passRequest(2, true, 500)
chainOrder500.passRequest(2, false, 500)
chainOrder500.passRequest(2, false, 0)
chainOrder500.passRequest(4, true, 500)
chainOrder500.passRequest(4, false, 500)
chainOrder500.passRequest(4, false, 0)

chainOrder500.passRequest(3, true, 500)
chainOrder500.passRequest(3, false, 500)
chainOrder500.passRequest(3, false, 0)