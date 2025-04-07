/*
 * @Date: 2022-04-18 22:47:28
 * @LastEditors: zhangheng
 * @LastEditTime: 2025-03-29 15:31:34
 */

function BetterMap(entries) {
  // 调用基类构造函数，但将 `new.target` 设置为子类，
  // 因此创建的实例具有正确的原型链。
  return Reflect.construct(Map, [entries], BetterMap);
}

BetterMap.prototype.upsert = function (key, actions) {
  if (this.has(key)) {
    this.set(key, actions.update(this.get(key)));
  } else {
    this.set(key, actions.insert());
  }
};

Object.setPrototypeOf(BetterMap.prototype, Map.prototype);
Object.setPrototypeOf(BetterMap, Map);

const map = new BetterMap([["a", 1]]);
map.upsert("a", {
  update: (value) => value + 1,
  insert: () => 1,
});
console.log(map.get("a")); // 2

console.log(map.__proto__.__proto__.__proto__.__proto__);
console.log(map.__proto__.constructor === BetterMap);
