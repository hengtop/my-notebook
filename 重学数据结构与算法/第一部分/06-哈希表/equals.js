/**
 * 用于比较两个对象是否相等
 */

function equals(a, b) {
  if (a === b) return true;

  if (!compareType(a, b)) {
    a = JSON.stringify(a);
    b = JSON.stringify(b);
  }
  if (a == null) return true;

  if (isArray(a)) {
    a = a.join("");
    b = b.join("");
    return a === b;
  }
  if (isObject(a)) {
    return deepEquals(a, b);
  }
  return a.length === b.length;

  // 比较对象的每个属性是否相等
}

function deepEquals(a, b) {
  // 比较两个属性的数组的长度是否一致
  if (Object.keys(b).length !== Object.keys(a).length) return false;
  for (const key in b) {
    if (Object.hasOwnProperty.call(b, key)) {
      const element = b[key];
      if (isObject(element)) {
        return deepEquals(a, b);
      } else {
        if (element + "" !== a[key] + "") {
          return false;
        }
      }
    }
  }
  return true;
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

function compareType(k1, k2) {
  return (
    Object.prototype.toString.call(k1) === Object.prototype.toString.call(k2)
  );
}

const a = {
  b: 1,
  say() {},
  a: "1",
};

const b = {
  b: 1,
  a: "1",
  say() {},
};

console.log(
  equals(
    {
      b: 1,
      a: 1,
    },
    2
  )
);
