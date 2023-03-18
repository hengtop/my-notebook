class Animal {
  active() {
    console.log("animal running")
  }
}

class Dog extends Animal {
  active() {
    console.log("dog run");
  }
}

class Cat extends Animal {
  active() {
    console.log("Cat run");
  }
}
//父类引用指向子类对象，多态的目的可以写出更加具有通用性的代码
function makeActions(animals:Animal[]) {
  animals.forEach((item) => {
    item.active();
  })  
}

makeActions([new Dog(), new Cat()]);