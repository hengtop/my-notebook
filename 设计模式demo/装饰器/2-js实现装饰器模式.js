const plane = {
  fire() {
    console.log('发射普通子弹')
  }
}

const missileDecorator = function () {
  console.log('发射导弹')
}

const atomDecorator = function () {
  console.log('发射原子弹')
}

let fire1 = plane.fire;

plane.fire = function () {
  fire1();
  missileDecorator();
}
plane.fire();

let fire2 = plane.fire;
plane.fire = function () {
  fire2();
  atomDecorator();
}

plane.fire();