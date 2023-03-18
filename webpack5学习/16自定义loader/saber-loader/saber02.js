//content就是入口文件中的代码
module.exports = function(content) {
  console.log('这是我的loader02');
  console.log(content)
  return content + 123
}

module.exports.pitch = function() {
  console.log('这是我的pitch-loader02');
}