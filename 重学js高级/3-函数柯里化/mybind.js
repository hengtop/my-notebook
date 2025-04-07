Function.prototype.hbind = function (thisArgs, args) {
  const fn = this;

  thisArgs = thisArgs == null ? globalThis : Object(thisArgs);

  return function () {
    thisArgs.__proto__.fn = fn;

    const res = thisArgs.fn(...arguments);
    delete thisArgs.__proto__.fn;
    return res;
  };
};

function foo(a, b) {
  console.log(this);
  console.log(a + b);
}

const foo1 = foo.hbind("hello this");
const foo2 = foo.bind("hello this");

foo1("myname", "yourname");
foo2("myname", "yourname");
console.log(Array.isArray([]));
[].splice;
