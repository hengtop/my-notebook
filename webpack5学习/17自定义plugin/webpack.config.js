const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoUploadPlugin = require('./plugins/AutoUploadPlugin')

module.exports = {
  entry:'./src/main.js',
  output: {
    path:path.resolve(__dirname, './build'),
    filename:'js/bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new AutoUploadPlugin({
      host:"121.196.194.165",
      username:"root",
      password:"JACKis.0123",
      port:'2333',
      remotePath:'/plugin_test'
    })
  ]
}