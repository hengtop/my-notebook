/*
 * @Date: 2022-03-27 16:07:32
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-27 16:09:35
 */
function add(x, y, z) {
  x += 2;
  y *= 2;
  z *= 2;
  return x + y + z;
}

console.log(add(10, 20, 30));

function addcur(x, y, z) {
  x = x + 2;
  return function (y) {
    y = y * 2;
    return function (z) {
      z = z * 2;
      return x + y + z;
    };
  };
}

console.log(addcur(10)(20)(30));
