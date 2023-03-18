const { math } = require("./js/math");
console.log(math(2,3));
console.log(q)
console.log("123");

const p = new Promise((resolve, reject) => {
  resolve(123);
})
p.then((value) => {
  console.log("value:", value);
})