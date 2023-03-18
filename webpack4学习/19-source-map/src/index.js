
//引入
import './font/iconfont.css';
import './index.css';
import './index.less';
import print from './index2.js'

function add (x,y) {
  return x + y;
}

 print()
console.log(add(3,5));

if(module.hot) {
  module.hot.accept('./index2.js', function () {
    //方法会监听index2.js的变化，一旦发生变化其他默认不重新打包
    //会执行后面的回from调函数
    //所以可以将引入文件放入这里
    print();
  })
}