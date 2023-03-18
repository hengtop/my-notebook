Function.prototype.before = function (beforeFn) {
  const __self = this;
  return function (...args) {
    beforeFn.apply(this, args);
    return __self.apply(this, args)
  }
}


Function.prototype.after = function (afterFn) {
  const __self = this;
  return function (...args) {
    const ret = __self.apply(this, args);
    afterFn.apply(this, args);
    return ret;
  }
}

// document.getElementById = document.getElementById.before(function () {
//   alert(1);
// })

const button = document.getElementById('button');
console.log(button)

window.onload = function () {
  alert(1);
}

window.onload = (window.onload || function () { }).after(function () {
  alert(2);
}).after(function () {
  alert(3)
}).after(function () {
  alert(4)
})