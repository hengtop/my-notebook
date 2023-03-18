/*
 * @Date: 2022-03-07 22:45:55
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-07 22:47:19
 */
function double(input: string | number | boolean) {
  if (typeof input === "string") {
    return input + input;
  } else {
    if (typeof input === "number") {
      return input * 2;
    } else {
      return !input;
    }
  }
}
