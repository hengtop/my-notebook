/* Array.prototype.unique = function () {
  const newArray = [];
  const tmp = new Map();
  for (let i = 0; i < this.length; i++) {
    if (!tmp.get(this[i])) {
      tmp.set(this[i], 1);
      newArray.push(this[i]);
    }
  }
  console.log(tmp);
  return newArray;
};
Array.prototype.unique2 = function () {
  return this.filter((item, index) => this.indexOf(item) === index);
};

const arr = [
  1,
  1,
  "1",
  "1",
  0,
  0,
  "0",
  "0",
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  {},
  {},
  [],
  [],
  /a/,
  /a/,
];

const arr2 = arr.unique();
console.log(arr2);
 */

const notSasy7 = (x) => {
  if (x % 7 === 0) {
    console.log(x);
  } else if (x % 10 === 7) {
    console.log(x);
  }
};
const arr = [];

for (let i = 1; i <= 100; i++) {
  arr.push(i);
}

arr.forEach((item) => {
  notSasy7(item);
});
