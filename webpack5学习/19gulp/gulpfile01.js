
//定义任务
const foo = (cb) => {
  console.log('foo');
  cb()
}

module.exports = {
  foo
}

module.exports.default = (cb) => {
  console.log("默认任务");
  cb();//执行回调结束任务
}