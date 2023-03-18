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
//获取对象属性的依赖函数
function getDep(target, key) {
  //根据对象target去除对应的map对象
  let depMap = targetMap.get(target);
  //判断是否需要响应式处理的对象放入
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
  return new Proxy(raw, {
    get(target, key) {
       const dep = getDep(target, key);
       dep.depend();
       return target[key];  
    },
    set(target, key, newValue) {
      const dep = getDep(target, key);
      target[key] = newValue;
      dep.notify()
    }
  });
}

const info = reactive({ counter: 100, name: "zhangsan" });

watchEffect(function () {
  console.log(info.counter * 100, info.name);
});
watchEffect(function () {
  console.log(info.counter * 2);
});
console.log(targetMap);

info.name="lisi";

console.log(targetMap);