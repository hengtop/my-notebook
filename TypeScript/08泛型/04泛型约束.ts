interface ILength {
  length: number
}

function getLength<T extends ILength>(arg: T) {
  return arg.length;
}

//只要有length就可以传进来
getLength(["abc"]);
getLength('abc');
getLength({length:100});

