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
  /* 可以将node_modules中的代码单独打包成一个chunk最终输出，避免多个文件引用同一个资源时打包造成重复引入
     就是把公共的文件单独打包成一个chunk */
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
  },
  mode: 'production',
  //devtool: 'source-map'
};
