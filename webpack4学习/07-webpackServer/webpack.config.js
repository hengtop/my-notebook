const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry:'./src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname,'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      //打包其他资源（除了html/css/js以外的资源）
      {
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode: 'development',

  //开发服务器,用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  //只会在内存编译打包，不会有输出
  //启动指令为webpack-dev-server
  devServer: {
    //项目构建后的路径
    contentBase: resolve(__dirname, 'build'),
    //启动gzip压缩
    compress: true,
    //端口号
    port: 3000,
    //默认打开浏览器
    open:true
  }

}