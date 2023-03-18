/* 
  使用dll技术对某些第三方库进行打包
  当你运行 webpack 时，默认查找 webpack.config.js 配置文件
    需求：需要运行 webpack.dll.js 文件
      --> webpack --config webpack.dll.js
 */
const { resolve } = require('path');
const webpack = require('webpack');
 module.exports = {
   entry: {
     //最终打包生成的name
     jquery: ['jquery']
   },
   output: {
     filename: '[name].js',
     path: resolve(__dirname,'dll'),
     library: '[name]_[hash]'//打包的库里面向外暴露出去的内容叫什么
   },
   plugins: [ 
     //打包生成一个manifest.json --> 提供jquery的映射
     new webpack.DllPlugin({
       name: '[name]_[hash]',//映射的库的暴露的内容名称
       path: resolve(__dirname,'dll/manifest.json')//输出的文件目录
     })
   ],
   mode: 'production'
 }