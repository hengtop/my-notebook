import '../css/index.css';
import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));

// eslint-disable-next-line
console.log(mul(9, 8));

/* 1. 注意eslint不认识window啥的变量需要再package.json中修改配置
    "eslintConfig": {
    "extends": "airbnb-base",
    "env": {
      "browser": true
    }
  }
  在之前的基础上加上env的配置，这里设置环境变量为浏览器，也可以设置环境变量为node
  2. serviceworker代码必须在服务器上运行
  我觉得可以使用liveserver
  也可以使用nodejs来写个服务器
  也可以下载依赖 npm i server -g  然后命令 serve -s build 表示把build这个文件中的静态资源暴露出去, 默认端口为5000
*/
// 注册serviceworker
// 处理兼容问题
if ('serviceWorker' in navigator) { // 判断是否存在
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('serviceworker注册成功~~~~~');
      })
      .catch(() => {
        console.log('serviceworker注册失败！！！！！');
      });
  });
}
