//支持复杂类型的heap

const heap = require("./heap");

class ObjectHeap extends heap {
  constructor(element, customCompare) {
    super(element);
    this.customCompare = customCompare;
  }
  compare(a, b) {
    if (this.customCompare) {
      return this.customCompare(a, b);
    } else {
      return super.compare(a, b);
    }
  }
}

const objHeap = new ObjectHeap([], (a, b) => {
  if (typeof a !== typeof b) {
    throw Error("The type of a and b is different");
  } else {
    return a.age - b.age;
  }
});

class Person {
  constructor(age, name) {
    this.age = age;
    this.name = name;
  }
}

// objHeap.add(new Person(18, "zhangsan"));
// objHeap.add(new Person(22, "lisi"));
// objHeap.add(new Person(6, "wangmazi"));
// objHeap.add(new Person(14, "saber"));
// objHeap.add(new Person(16, "nero"));

// console.log(objHeap.print());

module.exports = ObjectHeap;
