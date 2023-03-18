//content就是入口文件中的代码
const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
const schema = require('../saber-schema/saber01.json')

module.exports = function(content) {
  console.log('这是我的loader01');
  console.log(content);
  //获取传入的参数
  const options = getOptions(this);
  validate(schema, options, {
    name:'saber01'
  })
  console.log(options);
  const callback = this.async();
  //必须返回一个string或者buffer
  //return content + 123
  //另一种可以直接使用上下文中的callback函数返回
  setTimeout(() => {
    callback(null, content);
  }, 2000)
}

module.exports.pitch = function() {
  console.log('这是我的pitch-loader01');
}