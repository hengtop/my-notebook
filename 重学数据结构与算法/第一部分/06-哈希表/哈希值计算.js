// 字符串哈希值计算

function stringHashCode(str) {
  let hashCode = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    hashCode = (hashCode << 5) - hashCode + c;
  }
  return hashCode;
}

console.log(stringHashCode("jack"));
console.log(stringHashCode("false"));
