/**
 * Create by zhangheng on 2020/11/28
 */
const events = require('events');//当然在read.js中自己写的loopEvent对象只是node的事件对象的一个简单实现，现在我们调用下node为我们提供的事件对象方法
const fs = require('fs');
let e = new events.EventEmitter();


e.on('hello',function (data) {
  console.log('1.吃夜宵');
  console.log(data);
});
e.on('hello',function () {
  console.log('2.打游戏')
})

fs.readFile('test.txt',function (err,data) {
  if (err){
    console.log(err)
  } else {
    console.log(data);
    e.emit('hello',data);
  }
})
