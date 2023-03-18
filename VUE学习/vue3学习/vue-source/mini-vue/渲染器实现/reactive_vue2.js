class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }
  notify() {
    this.subscribers.forEach((effect) => {
      effect();
    });
  }
}

let activeEffect = null;
function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

const targetMap = new WeakMap();
function getDep(target, key) {
  //根据对象target去除对应的map对象
  let depMap = targetMap.get(target);
  if (!depMap) {
    depMap = new Map();
    targetMap.set(target, depMap);
  }
  //取出对应的dep对象
  let dep = depMap.get(key);
  if (!dep) {
    dep = new Dep();
    depMap.set(key, dep);
  }
  return dep;
}

function reactive(raw) {
  Object.keys(raw).forEach((key) => {
    const dep = getDep(raw, key);
    let value = raw[key];
    Object.defineProperty(raw, key, {
      get() {
        dep.depend();
        return value;
      },
      set(newValue) {
        if (value !== newValue) {
          value = newValue;
          dep.notify();
        }
      },
    });
  });
  return raw;
}

const info = reactive({ counter: 100, name: "zhangsan" });

watchEffect(function () {
  console.log(info.counter * 100, info.name);
});
watchEffect(function () {
  console.log(info.counter * 2);
});

info.counter++;
