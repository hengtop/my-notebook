const HashMap = require("./hashMap");

const hashMap = new HashMap();

for (let i = 0; i < 20; i++) {
  hashMap.put(i, i);
}

// console.log(hashMap.size());
// console.log(hashMap.get(1));
// console.log(hashMap.get(2));
// console.log(hashMap.get(3));
// console.log(hashMap.get(4));
// console.log(hashMap.table.length);
hashMap.put({ name: 1, age: 1 }, { name: 1, age: 1 });
//hashMap.put({ name: 1, age: 1 }, 3);
hashMap.put("jack", 676);
hashMap.put(1, 34);
hashMap.put(true, 22);
hashMap.put(Symbol("1"), 2);
hashMap.put([1, 2, 1], 666);
hashMap.put([1, "2", 1], 222);
hashMap.put([1, "2", 1], 333);
console.log("containsValue", hashMap.containsValue(22));
console.log("---remove---");
//console.log("返回", hashMap.remove(1, 34));
// hashMap.remove(true, 22);
// hashMap.remove(Symbol("1"), 2);
// hashMap.remove({ name: 1, age: 2 }, 3);
// hashMap.remove("jack", 676);

console.log("---size---");
console.log(hashMap.size());

console.log("---get----");
console.log("1", hashMap.get(1));
console.log("{ name: 1, age: 1 }", hashMap.get({ name: 1, age: 1 }));
console.log("{ name: 1, age: 2 }", hashMap.get({ name: 1, age: 2 }));
console.log("Symbol('1')", hashMap.get(Symbol("1")));
console.log("jack", hashMap.get("jack"));
console.log("true", hashMap.get(true));
console.log("[array]", hashMap.get([1, 2, 1]));
console.log("[array]", hashMap.get([1, "2", 1]));
console.log(hashMap.get(19));
console.log(hashMap.table.length);
