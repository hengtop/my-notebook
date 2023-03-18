interface ISwim {
  swimming: () => void
}

interface IEat {
  eating: () => void
}

//类实现接口
class Animal {

}
//继承只能单继承，一个类可以实现多个接口
class Fish extends Animal implements ISwim, IEat {
  constructor() {
    super();
  }
  swimming() {
    console.log("hahh");
  }
  eating() {
    console.log("hahh");
  }
}

function swimAction(swim:ISwim) {
  swim.swimming();
}

//所有实现了接口的类的实例都是可以传入的
swimAction(new Fish());

export{}