const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* 
   代码分割
   通过配置多个入口实行代码分割
*/

module.exports = {
  entry: './src/js/index.js',
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
  /* 可以将node_modules中的代码单独打包成一个chunk最终输出，避免多个文件引用同一个资源时打包造成重复引入
     就是把公共的文件单独打包成一个chunk */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production',
  //devtool: 'source-map'
};
