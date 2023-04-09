function objectHashCode(object) {
  let hashCode = 0;
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
      if (isObject(element)) {
        hashCode += objectHashCode(object);
      } else if (typeof element === "number") {
        hashCode += element;
      } else {
        hashCode += stringHashCode(JSON.stringify(element));
      }
    }
  }
  return hashCode;
}

function stringHashCode(str) {
  let hashCode = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    hashCode = (hashCode << 5) - hashCode + c;
  }
  return hashCode;
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

console.log(objectHashCode({ name: 1, age: 1 }));
console.log(objectHashCode([1, "2", 1]));
