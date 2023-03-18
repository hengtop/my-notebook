//content就是入口文件中的代码
//normalLoader
module.exports = function(content) {
  console.log('这是我的loader03');
  console.log(content)
  return content + 123
}

//pitchLoader
module.exports.pitch = function() {
  console.log('这是我的pitch-loader03');
}