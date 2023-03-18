/* 
  函数柯里化,把接受多个参数的函数变换成接受一个单一的参数的函数,返回接受余下的参数且返回结果的新函数
  参数复用
  提前返回
 延迟执行
*/
function curry(fn, args = []) {
  let length = fn.length; //获取参数个数
  return function () {
    let newArgs = args.concat(Array.from(arguments));
    if (length > newArgs.length) {
      return curry.call(this, fn, newArgs);
    }
    return fn.apply(this, newArgs);
  };
}

const currying = function (fn, ...args) {
  const length = fn.length;
  return function (...newArgs) {
    if (newArgs.length < length) {
      return currying(fn.bind(this, ...newArgs), args);
    } else {
      return fn.apply(this, newArgs);
    }
  };
};

function multiFn(a, b, c) {
  console.log(a * b * c);
}

var multi = currying(multiFn);
const multi4 = currying(multi(4));
const multi12 = currying(multi(3, 4));
const multi12_ = currying(multi4(3));
// var multi = curry(multiFn);
// const multi4 = curry(multi(4));
// const multi12 = curry(multi(3, 4));
// const multi12_ = curry(multi4(3));

multi12(1);
multi12(2);
multi12(3);
multi12_(5);
multi4(3, 4);
multi(2)(3)(4);
multi(2, 3, 4);
multi(2)(3, 4);
multi(2)(3, 4);
