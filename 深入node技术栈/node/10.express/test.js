/**
 * Create by zhangheng on 2021/5/7
 */

/*
const str = "hello world";
const index  = str.indexOf("llo ");
console.log(index);
*/
//工厂模式
/*
function CreatePerson(name, age, job) {
  const o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function () {
    console.log(this.name);
  }
  return o;
}

const p1 = new CreatePerson('zhangsan', 18, 'student');
p1.sayName()
console.log(p1);
console.log(p1 instanceof CreatePerson)
*/

//构造函数模式
/*function CreatePerson(name, age, job) {
  this.name = name;
  this.age = age;
  this.job =job;
  this.sayName = function () {
    console.log(this.name)
  }
}

const p1 = new CreatePerson('zhangsan', 18, 'student');
p1.sayName()
console.log(p1);
console.log(p1 instanceof CreatePerson);
console.log(p1 instanceof Object);*/

//原型模式
/*function CreatePerson() {

}
CreatePerson.prototype.name = "zhangsan";
CreatePerson.prototype.age = 18;
CreatePerson.prototype.job = "student";
CreatePerson.prototype.sayName = function () {
  console.log(this.name);
}
const p1 = new CreatePerson();
p1.sayName()
console.log(p1);
console.log(CreatePerson.prototype.constructor === CreatePerson);
console.log(p1.__proto__ === CreatePerson.prototype)
console.log(CreatePerson.prototype.isPrototypeOf(p1))
console.log(Object.getPrototypeOf(p1) === CreatePerson.prototype)
console.log(p1.hasOwnProperty("name"));
p1.name = "lisi";
console.log(p1);
console.log(p1.hasOwnProperty("name"));*/
//组合继承
/*function Super(name) {
  this.name = name
  this.color = ['red', 'green', 'blue'];
}
Super.prototype.sayName = function() {
  console.log(this.name)
}
function Sub(name, age) {
  Super.call(this, name);
  this.age = age;
}
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

const instance1 = new Sub('zhangsan', 18);
instance1.color.push('white');
const  instance2 = new Sub('lisi', 21);
console.log(instance1);
console.log(instance2);*/

//寄生组合继承

/*function object(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
function inheritPrototype(subType, superType) {
  const prototype = Object.create(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype
}

function Super(name) {
  this.name = name
  this.color = ['red', 'green', 'blue'];
}
Super.prototype.sayName = function() {
  console.log(this.name)
}
function Sub(name, age) {
  Super.call(this, name);
  this.age = age;
}
inheritPrototype(Sub, Super);
const instance1 = new Sub('zhangsan', 18);
instance1.sayName();
instance1.color.push('white');
const  instance2 = new Sub('lisi', 21);
console.log(instance1);
console.log(instance2);*/


/*
const arr = [11, -12, 91111, -7]
function maxChildArr(arr) {
  let sum = 0;
  let max = 0;
  let tem = [];
  let varTem = [];
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    tem.push(i);
    if(sum < 0) {
      sum = 0;
      tem = [];
    } else {
      if(sum > max) {
        max = sum;
        varTem = [...tem];
      }
    }
  }
  return varTem;
}

console.log(maxChildArr(arr));
*/

/*function maxSumMul(arr) {
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];
    let j = i;
    while (--j >= 0 && arr[j] > arr[i]) {//向左扩散
      num += arr[j]
    }
    j = i;
    while (++j < arr.length && arr[j] > arr[i]) {//向右扩散
      num += arr[j];
    }
    num *= arr[i];
    max = num>max?num:max;
  }
  return max;
}

console.log(maxSumMul([3, 7, 6, 5, 4, 2]));*/
/* var maxSlidingWindow = function (nums, k) {
  let maxArr = [];
  let resArr = [];
  let i = 0;
  while (i < k) {
    while (maxArr.length !== 0 && nums[maxArr[maxArr.length - 1]] < nums[i]) {
      maxArr.splice(maxArr.length - 1, 1);
    }
    maxArr.push(i);
    i++;

  }
  resArr.push(nums[maxArr[0]]);
  for (let j = 0; j < nums.length - k + 1; j++) {
    while (maxArr.length !== 0 && (nums[j + k - 1] >= nums[maxArr[maxArr.length - 1]])) {
      maxArr.splice(maxArr.length - 1, 1);
    }
    maxArr.push(j + k - 1);
    let m = 0;
    while (maxArr[m] < j) {
      m++;
    }
    resArr.push(nums[maxArr[m]]);
  }
  return resArr
};
console.log(maxSlidingWindow([4, 3, 11], 3)); */
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
  return Promise.resolve().then(() => {
    console.log(123)
  })
  //console.log(Promise.resolve(123))
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1();
new Promise(resolve => {
  console.log('promise1')
  resolve()
})
  .then(function () {
    console.log('promise2')
  })
  .then(function () {
    console.log('promise3')
  })
  .then(function () {
    console.log('promise4')
  })

console.log('script end')
