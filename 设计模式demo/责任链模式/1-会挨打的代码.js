

function order(orderType, pay, stock) {
  if (orderType === 1) {
    if (pay === true) {
      console.log('500元定金，得到优惠卷')
    } else {
      if (stock > 0) {
        console.log('普通购买无优惠卷')
      } else {
        console.log('没库存')
      }
    }
  } else if (orderType === 2) {
    if (pay === true) {
      console.log('200元定金，得到优惠卷')
    } else {
      if (stock > 0) {
        console.log('普通购买无优惠卷')
      } else {
        console.log('没库存')
      }
    }
  } else {
    if (stock > 0) {
      console.log('普通购买无优惠卷')
    } else {
      console.log('没库存')
    }
  }
}

order(3, true, 0)


