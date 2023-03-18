function order500(orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500元定金')
  } else {
    order200(orderType, pay, stock)
  }
}


function order200(orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金')
  } else {
    orderNormal(orderType, pay, stock)
  }
}


function orderNormal(orderType, pay, stock) {
  if (stock > 0) {
    console.log("普通购买")
  } else {
    console.log('没了')
  }
}

order500(1, true, 0)