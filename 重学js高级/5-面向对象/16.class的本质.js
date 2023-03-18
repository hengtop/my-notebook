/*
 * @Date: 2022-04-10 16:17:04
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-04-11 21:22:47
 */

// es6的语法糖

class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log(this.name);
  }
}

// 实际的代码
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

// 这里其实使用了魔法注释，标记这个函数是一个纯函数，好处就是这个函数在webpack压缩的时候可以进行tree-shaking
var Person = /*#__PURE__*/ (function () {
  function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
  }

  _createClass(Person, [
    {
      key: "getName",
      value: function getName() {
        console.log(this.name);
      },
    },
  ]);

  return Person;
})();
