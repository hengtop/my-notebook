/*
 * @Date: 2021-06-20 14:26:46
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-10-30 19:11:55
 */
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
      console.log(timer);
    }
    //清除后重新开启定时器
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

//节流
function throttle(fn, delay) {
  let begin = 0;
  return function (...arg) {
    let curr = new Date().getTime(); //获取当前时间戳
    if (curr - begin > delay) {
      fn.apply(this, arg);
      begin = curr; //记录上次点击的时间
    }
  };
}

function handleClick(e) {
  console.log(e);
  console.log(this);
  console.log(arguments);
}
document
  .querySelector("button")
  .addEventListener("click", debounce(handleClick, 500), false);
