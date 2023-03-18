const { resolve } = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');//插件需要引入使用
const webpack = require('webpack');
const addAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
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
    }),
    //告诉webpack那些库不参与打包，同时使用时名称也得改
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname,'dll/manifest.json')
    }),
    //将某个文件打包输出出去，并在html中自动引入该资源
    new addAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname,'dll/jquery.js')
    })
  ],
  mode: 'production'
}