/*
 * @Date: 2022-03-20 20:05:59
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-20 20:18:57
 */


// const obj = {
//   name:'zhangsan',
//   foo:function() {
//     console.log(this.name)
//   }
// }

// obj.foo()
// obj.foo.call({name:'lisi'})

// const bar = obj.foo.bind({name:'wangwu'})
// bar();
// obj.foo();

// function foo() {
//   console.log(this);
// }

// const obj2 = {
//   name:'lilisi',
//   foo:foo.bind('zhangsan')
// }
// obj2.foo()

// const obj = {
//   name:'obj',
//   foo:function() {
//     console.log(this)
//   }
// }

// obj.foo();

// const f = new obj.foo();
// console.log(f);



function foo() {
  console.log(this);
}

const bar  = foo.bind('abc');
bar()

const obj = new bar();

/* 
 1.显示绑定（call,apply,bind）高于隐式绑定
 2. new 高于隐式绑定
 3. new 大于显示绑定 不能和apply call bind一起使用
*/


