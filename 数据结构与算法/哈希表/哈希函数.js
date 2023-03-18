/**
 * Create by zhangheng on 2021/4/15
 */

 function hashFunc(str, size) {
 //hashCode变量
 let hashCode = 0;

 //霍纳算法（秦九昭算法）
 for (let i = 0; i < str.length; i++) {
   hashCode = 37 * hashCode + str.charCodeAt(i);
 }
 return hashCode % size;
}

//测试
console.log(hashFunc('abc', 7));
console.log(hashFunc('cba', 7));
console.log(hashFunc('mba', 7));

