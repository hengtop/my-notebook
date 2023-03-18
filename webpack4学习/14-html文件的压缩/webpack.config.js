const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {

  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      //压缩处理
      minify: {
        //移除空格
        collapseWhitespace: true,
        //移除注释
        removeComments: true
      }
    })
  ],
  mode: 'production'
}