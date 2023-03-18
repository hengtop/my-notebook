/* const s = new Array();
console.log(Object.prototype.toString.call(undefined));

const obj = {
  a:1,
  valueOf:function() {
    return "11111"
  },
  toString:function(){
    return "2222"
  }
}
console.log(String(obj));

 */
/* const a = function () { }
console.log(typeof 123);//number 
console.log(typeof "123");//string
console.log(typeof true);//boolean
console.log(typeof Symbol(123));//symbol
console.log(typeof 123n);//bigint
console.log(typeof undefined);//undefined
console.log(typeof null);//object
console.log(typeof {});//object
console.log(typeof []);//object
console.log(typeof a);//function
 */

/* console.log([] instanceof Array); //true
console.log({} instanceof Array); //false
console.log([] instanceof Object); //true
console.log(null instanceof Object) //false */

/* console.log('1'.__proto__.constructor); //[Function: String]
console.log(['1'].__proto__.constructor); //[Function: Array] */

const a = function () { }
console.log(Object.prototype.toString.call(123)); //[object Number]
console.log(Object.prototype.toString.call("123")); //[object String]
console.log(Object.prototype.toString.call(true)); //[object Boolean]
console.log(Object.prototype.toString.call(Symbol(123))); //[object Symbol]
console.log(Object.prototype.toString.call(123n)); //[object BigInt]
console.log(Object.prototype.toString.call(undefined)); //[object Undefined]
console.log(Object.prototype.toString.call(null)); //[object Null]
console.log(Object.prototype.toString.call({})); //[object Object]
console.log(Object.prototype.toString.call([])); //[object Array]
console.log(Object.prototype.toString.call(a)); //[object Function]
