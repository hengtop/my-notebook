/*
 * @Date: 2022-03-07 23:00:35
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-07 23:03:31
 */
function isString(test: any): test is string {
  return typeof test === "string";
}

function example(foo: any) {
  if (isString(foo)) {
    console.log("it is a string" + foo);
    console.log(foo.length); // string function
    // 如下代码编译时会出错，运行时也会出错，因为 foo 是 string 不存在toExponential方法
    //toExponential()为number上的方法，表示以指数表示法返回该数值字符串表示形式
    console.log(foo.toExponential(2));
  }
  // 编译不会出错，但是运行时出错
  console.log(foo.toExponential(2));
}
example("hello world");
