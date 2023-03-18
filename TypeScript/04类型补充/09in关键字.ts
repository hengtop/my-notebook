/*
 * @Date: 2022-03-07 22:48:03
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-07 22:49:19
 */
interface Bird {
  fly: number;
}

interface Dog {
  leg: number;
}

function getNumber(value: Dog | Bird) {
  if ("fly" in value) {
    return value.fly;
  }
  return value.leg;
}
