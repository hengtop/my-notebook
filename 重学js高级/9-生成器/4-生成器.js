/*
 * @Date: 2022-05-21 20:23:27
 * @LastEditors: zhangheng
 * @LastEditTime: 2025-03-29 21:09:28
 */
async function foo() {
  const res = await {
    then(resolve, reject) {
      reject("hahas");
    },
  };
  console.log(res);
}

console.log("start");
foo().catch((err) => {
  console.log("err", err);
});
console.log("end");

function* foo1() {
  console.log("函数开始执行~");

  const value1 = 100;
  console.log("第一段代码:", value1);
  const a = yield value1;
  console.log(a);

  const value2 = 200;
  console.log("第二段代码:", value2);
  const a1 = yield value2;

  console.log(a1);

  const value3 = 300;
  console.log("第三段代码:", value3);
  yield value3;

  console.log("函数执行结束~");
  return "123";
}

// generator本质上是一个特殊的iterator
const generator = foo1();
console.log("返回值1:", generator.next());
console.log("提前结束", generator.return());
// console.log("返回值2:", generator.next(21212));
// console.log("返回值3:", generator.next(313131));
// console.log("返回值3:", generator.next());

console.log("====== throw");

function* foo2() {
  console.log("代码开始执行~");

  const value1 = 100;
  let aa;
  try {
    aa = yield value1;
  } catch (error) {
    console.log("捕获到异常情况:", error);
    console.log(aa);
    yield "abc";
  }

  console.log("第二段代码继续执行");
  const value2 = 200;
  yield value2;

  console.log("代码执行结束~");
}

const generator2 = foo2();

const result = generator2.next();
console.log(result);
console.log(generator2.throw("error message"));
console.log(generator2.next());
console.log(generator2.next());
