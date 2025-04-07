Function.prototype.happly = function (thisArgs, args) {
  const fn = this;
  
  thisArgs = thisArgs == null ? globalThis: Object(thisArgs);

  thisArgs.__proto__.fn = fn;
  const res = thisArgs.fn(...args);
  return res;
}

function foo(a, b) {
  console.log(this);
  console.log(a+b)
}

foo.happly('hello this', ['myname', 'yourname'])
foo.apply('hello this', ['myname', 'yourname'])