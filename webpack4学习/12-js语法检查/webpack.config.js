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
      /* 语法检查
         主要是规范代码的编写格式，统一代码格式，检查常见的语法错误 需下载 eslint-loader  eslint
         注意只检查自己写的代码，别检查其他库的源代码
         设置检查规则   在package.json中的eslintConfig中设置
         推荐使用airbnb代码规范 (github上去看看)  还要下载依赖eslint-config-airbnb-base  eslint-plugin-import 

      */
      {
        test: /\.js$/,
        exclude: /node_modules/,//排除node_modules中的代码检查
        loader: 'eslint-loader',
        options: {
          //代表自动修复语法规范
          fix:true
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