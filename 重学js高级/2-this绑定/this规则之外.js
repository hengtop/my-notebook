/*
 * @Date: 2022-03-20 20:20:24
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-20 20:39:30
 */

/* 
  当执行apply/call/bind：传入null/undefined时会自动将this绑定成全局对象
*/

// function foo() {
//   console.log(this);
// }

// foo.call('abc')
// foo.call(null)
// foo.call(undefined)
// foo.apply(null)
// foo.apply(undefined)



// const obj1 = {
//   name:'obj1',
//   foo:function() {
//     console.log(this);
//   }
// }

// const obj2 = {
//   name:'obj2',
//   foo:function() {
//     console.log(this);
//   }
// };//这里不加分号或出现语法歧义导致报错
   //间接函数引用导致丢失this
// (obj2.foo = obj1.foo)();

// obj2.foo()


function foo(el) {
  console.log(el,this.id);
}

const obj = {
  id:'awesome',
  bar:function() {
    console.log(this);
  }
};
obj.bar();

const bar2 = obj.bar;
bar2();
//这里不加分号或出现语法歧义导致报错

[1,2,3].forEach(foo,obj)


