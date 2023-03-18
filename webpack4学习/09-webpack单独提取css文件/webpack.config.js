const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname,'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          //'style-loader',
          //使用miniCssExtractPlugin.loader取代style-loader就可以实现将css单独分离打包出来
          miniCssExtractPlugin.loader,
           'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    new miniCssExtractPlugin({
      //对单独输出的css目录进行修改
      filename:'css/built.css'
    })
  ],
  mode: 'development'
}