function * gen(arg){
  console.log(arg);
  let one = yield 111;
  console.log(one);
  let two = yield 222;
  console.log(two)
  let three = yield 333;
  console.log(three)

}
let iterator = gen('AAA'); 
console.log(iterator.next());//next方法可以传入实参
 console.log(iterator.next('BBB'));//第二个next传入的参数将会作为第一个yield语句的返回结果
/*console.log(iterator.next('CCC'));
console.log(iterator.next('DDD')); */
    //模拟获取 用户数据 订单数据 商品数据
/*     function getUSers() {
      setTimeout(() => {
        let data = "用户数据"
        _iterator.next(data);//第二次调用其中的参数会作为第一个yield的语句的返回值
      }, 1000);
    }
    function getOrders() {
      setTimeout(() => {
        let data = "订单数据"
        _iterator.next(data);
      }, 1000);
    }
    function getGoods() {
      setTimeout(() => {
        let data = "商品数据"
        _iterator.next(data);
      }, 1000);
      
    }
    //声明生成器函数
    function * _gen(arg){
      console.log(arg)
      let user = yield getUSers(arg); 
      console.log(user);
      let order = yield getOrders();
      console.log(order)
      let goods = yield getGoods();
      console.log(goods)
    }
    let _iterator = _gen("000");
    _iterator.next(); */

/*     function *a() {
      return yield 1;
    }
    const b  = a();

    console.log(b.next());
    console.log(b.next()); */