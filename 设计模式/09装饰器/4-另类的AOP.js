

function after(fn, afterFn) {
  return function (...args) {
    const ret = fn.apply(this, args);
    afterFn.apply(this, args);
    return ret;
  }
}

function before(fn, beforeFn) {
  return function (...args) {
    // 这里共用一个属性对象所以可以修改args动态给原函数扩展参数
    beforeFn.apply(this, args);
    return fn.apply(this, args);
  }
}

// document.getElementById = document.getElementById.before(function () {
//   alert(1);
// })

const button = document.getElementById('button');
console.log(button)

window.onload = function (params) {
  //alert(1);
  console.log(params);
}

window.onload = before((window.onload || function (params) { }), function (params) {
  params.a = 11111;
})