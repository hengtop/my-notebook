/* function deepClone(initObj, cloneObj = {}) {
  for(i in initObj){
    const propertyValue = initObj[i];//获取属性值
    if(propertyValue === initObj){//防止循环引用
      continue;
    }
    if(typeof propertyValue === "object"){
      cloneObj[i] = (propertyValue.constructor === Array) ? [] : {};
      deepClone(propertyValue, cloneObj[i]);
    } else {
      cloneObj[i] = propertyValue;
    }
  }
  return cloneObj;
} */

function deepClone(initObj, cloneObj = {}) {
  for (const i in initObj) {
    //获取属性值
    const propertyValue = initObj[i];
    //跳过循环引用
    if (propertyValue == initObj) {
      continue;
    }
    if (typeof propertyValue === "object") {
      //进一步判断是否为数组
      cloneObj[i] = propertyValue.constructor === Array ? [] : {};
      //递归
      deepClone(propertyValue, cloneObj[i]);
    } else{
      cloneObj[i] = propertyValue;
    }
  }
  return cloneObj;
}

const a = {
  name: "zhangsan",
  arr: [{ index: 1 }, { index: 2 }],
  age: 20,
  other: {
    name: "you",
  },
  say() {
    console.log("hello");
  },
};

const b = deepClone(a);
b.arr[0].index = 999;
console.log(a, b);
