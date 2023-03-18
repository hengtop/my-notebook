const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.less$/,

        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        //处理图片
        test: /\.(jpg|png|gif)$/,
        //只使用一个loader可以用如下写法
        loader: 'url-loader',
        options: {
          //图片小于8kb就会被base64处理，优点就是可以减少请求数量，缺点就是图片体积会变大
          limit: 8 * 1024,
          //对图片进行重命名，取图片hash值的前十位，[ext]取文件的原来的后缀名
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        //处理html中的图片，负责引入img，从而被url-loader进行处理
        loader: 'html-loader',
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