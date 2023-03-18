const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* 
   代码分割
   通过配置多个入口实行代码分割
*/

module.exports = {
  entry: {
    //多入口
    main: './src/js/index.js',
    test: './src/js/test.js'
  },
  output: {
    //名字设置  如mian打包后就为main[hash]
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  mode: 'production',
  //devtool: 'source-map'
};
