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

Function.prototype.after = function (fn) {
  return (...args) => {
    const ret = this.apply(null, args);
    if (ret === 'next') {
      return fn.apply(null, args);
    }
    return ret;
  }
}


const order = order500
  .after(order300)
  .after(order200)
  .after(orderNormal);

order(1, true, 500)
order(1, false, 500)
order(1, false, 0)

order(2, true, 500)
order(2, false, 500)
order(2, false, 0)

order(4, true, 500)
order(4, false, 500)
order(4, false, 0)

order(3, true, 500)
order(3, false, 500)
order(3, false, 0)