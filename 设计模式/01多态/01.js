class Animal {
  sound() {
    console.log('说话');
  }
}

class Cat extends Animal {
  sound() {
    console.log("喵喵喵");
  }
}

class Dog extends Animal {
  sound() {
    console.log("汪汪汪");
  }
}

function makSound(animal) {
  animal.sound();
}

makSound(new Cat());
makSound(new Dog());