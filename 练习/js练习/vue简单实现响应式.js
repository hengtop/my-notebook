class Dep {
  constructor() {
    this.subscribers = new Set();
  }
  depend() {
    if (reactiveValue) {
      this.subscribers.add(reactiveValue);
    }
  }
  notify() {
    this.subscribers.forEach((fn) => {
      fn();
    });
  }
}

let reactiveValue = null;
function watchEffect(effect) {
  reactiveValue = effect;
  effect();
  reactiveValue = null;
}

const targetMap = new WeakMap();
function getDep(target, key) {
  let depMap = targetMap.get(target);
  if (!depMap) {
    depMap = new Map();
    targetMap.set(target, depMap);
  }
  let dep = depMap.get(key);
  if (!dep) {
    dep = new Dep();
    depMap.set(key, dep);
  }
  return dep;
}

const reactive = (raw) => {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getDep(target, key);
      dep.depend();
      return target[key];
    },
    set(target, key, newValue) {
      const dep = getDep(target, key);
      target[key] = newValue;
      dep.notify();
    },
  });
};

const ra = reactive({ name: "zhangsan", age: 12 });

watchEffect(() => {
  console.log(ra.name, ra.age);
});
watchEffect(() => {
  console.log(ra.age);
});

ra.age="lis"
