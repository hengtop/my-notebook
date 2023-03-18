const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      /* js的兼容处理 依赖 babel-loader @babel/preset-env @babel/core */
      //要想对所有js写法进行兼容性处理则需要再引入 @babel/polyfill,下载后可以直接在入口js中通过import引入即可(这样会引入新的问题就是打包后体积变大)
      //另一种解决方案：按需兼容性处理  需引入 core-js  ,注意使用该方案的话就要注释掉 @babel/polyfill
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          //预设：指示babel做什么样的兼容性处理,如果只写下面这一行的预设，则只会对一些js语法进行兼容转换 所以还要下载 
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                //指定corejs的版本
                corejs: {
                  version: 3
                },
                //指定兼容性到哪个版本
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}