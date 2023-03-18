const isType = function (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  };
};

const isString = isType("String");
const isNumber = isType("Number");
console.log(isType("Symbol")(Symbol("null")));
console.log(isString({}));
console.log(isNumber([]));

//简单的单例模式
function getSingle(fn) {
  let ret;
  return function () {
    return ret || (ret = fn.apply(this, arguments));
  };
}

//需要一个变量来引用整个函数返回的匿名函数
const getObject = getSingle(function () {
  return new Object();
});

const p1 = getObject();
const p2 = getObject();
console.log("-------");
console.log(p1 === p2);
