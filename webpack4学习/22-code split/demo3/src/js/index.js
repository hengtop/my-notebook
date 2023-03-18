
function sum(...args) {
    return args.reduce((p, c) => p + c, 0);
  }

/* 通过js代码来实现将test单独打包成一个chunk */

import(/* webpackChunkName: 'test' */'./test').then(({mul}) => {
  // eslint-disable-next-line
  console.log('加载成功');
  // eslint-disable-next-line
  console.log(mul(9,8));
}).catch(() => {
  // eslint-disable-next-line
  console.log('加载失败');
})


// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));


