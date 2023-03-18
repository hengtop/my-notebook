const { resolve } = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');//插件需要引入使用

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname,'build')
  },
  module: {
    rules: [
      {

      }
    ]
  },
  plugins: [
    //默认会创建一个空html，会引入其他的打包js和样式资源
    new htmlWebpackPlugin({
      //会复制index.html的结构，同时引入其他的打包js和样式资源
      template: './src/index.html'
    })
  ],
  mode: 'development',
  externals: {//将一些不需要的东西排除出去，不打包到一起
    //忽略库名 --属性名是包名，值是页面引入jq的时候提供的变量（对象）
    jquery: 'jQuery'
  }
}