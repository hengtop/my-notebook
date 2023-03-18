//几种应用场景
const func = function () {
  let a = 1;
  return function () {
    a++;
    console.log(a);
  };
};

const foo = func();

foo();

foo();

foo();


const Type = {};

for(let i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
  Type['is'+type] = function(obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  }
}


console.log(Type.isString("dsdsd"));
console.log(Type.isArray([]));
console.log(Type.isNumber(122));
console.log(Type);


/* for(let i = 0, type; type=undefined;) {
  console.log("hhh");
} */

function a() {
  let a = 1;
  return a = 3
}
let b = 1;
console.log(b=5);

