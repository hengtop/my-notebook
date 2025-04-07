Function.prototype.hcall = function (thisArgs, ...args) {
  const fn = this;
  
  thisArgs = thisArgs == null ? globalThis: Object(thisArgs);

  thisArgs.__proto__.fn = fn;
  const res = thisArgs.fn(...args);
  return res;
}

function foo(bar) {
  console.log(this);
  console.log(bar)
}

foo.hcall('hello this', 'myname')
foo.call('hello this', 'myname')