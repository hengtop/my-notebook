const path = require('path');
module.exports = {
  mode:"development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename:"zhangheng.js",
    //开发库文件
    libraryTarget:'umd',//支持amd/commonjs2（node中实现的）/浏览器
    library:"zhangheng",
    globalObject:'this'
  }
}