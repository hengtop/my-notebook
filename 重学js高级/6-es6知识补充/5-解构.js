const a = Symbol.for("aaa");
const b = Symbol.for("aaa");
console.log(a === b);

const key = Symbol.keyFor(a);
console.log(key);
