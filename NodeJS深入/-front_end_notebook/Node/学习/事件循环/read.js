/**
 * Create by zhangheng on 2020/11/28
 */
const fs = require('fs');

fs.readFile("test.txt",function (err,data) {
  if(err){
    console.log(err);
  } else {
    console.log(data);
    //这里我们完成文件的读取后想执行一些事情
    /*
    * 1.调用数据库查看所有用户的信息
    * 2.统计年龄
    * 3.查看所有用户的的学校的详细信息
    *   ....
    * 但是在这里一件一件的写会使得回调函数中的代码过于冗杂所以，可以考虑封装一个事件循环机制来处理这一系列事件
    * */
    loopEvent.emit('readSuccess',data);

  }
});


let loopEvent = {
  event:{
    //存放事件队列，如：
    //readSuccess:[fn1,fn2,fn3,...]
  },
  on(eventName,eventFn){//事件的监听保存
    if(this.event[eventName]){//已经有事件队列了
      this.event[eventName].push(eventFn);//保存函数
    } else{
      this.event[eventName] = [];//创建事件队列
      this.event[eventName].push(eventFn);
    }
  },
  emit(eventName,data){//事件的触发
    if(this.event[eventName]){//判断存在事件队列？
      this.event[eventName].forEach((itemFn) => {
        itemFn(data);//循环遍历调用函数
      });
    }
  }
}

//以下要调用的事件
loopEvent.on('readSuccess',function (data) {
  console.log("1.调用数据库查看所有用户的信息");
});
loopEvent.on('readSuccess',function (data) {
  console.log("2.统计年龄");
});
loopEvent.on('readSuccess',function (data) {
  console.log("3.查看所有用户的的学校的详细信息");
});
