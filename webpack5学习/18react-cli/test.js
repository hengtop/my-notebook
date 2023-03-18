
//const names = [1,2,3,undefined, null, "", " ", false].filter(Boolean);
//等价于
const names = [1,2,3,undefined, null, "", " ", false].filter((item) => Boolean(item));
console.log(names);