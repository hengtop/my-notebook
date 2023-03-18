//import '@babel/polyfill';
const add =  (x, y) => {
  return x + y;
}

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('定时器执行完毕~~~');
    resolve();
  },1000);
});

console.log(p);

// eslint会对console做出警告，所以可以加一条注释
// eslint-disable-next-line
console.log(add(1, 6));
