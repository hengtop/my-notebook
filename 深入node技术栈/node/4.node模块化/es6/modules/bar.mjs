export function NewName() {
}

/**
 * Create by zhangheng on 2021/4/28
 */
const name = 'es6'
const age = 18;
/*
* 导出方式有三种
* 1.
* export const name = xxx;
* export const say = function () {}
* 2. {}中统一导出
* export {} //这里{}不是对象,是防止要导出变量的引用列表
* export {
  name,
  age
 }
 3. 导出时可以给变量起别名
 * export {
  name as NewName,
  age
  }
* */

export {
  /*name as Fname,*/
  age
}
