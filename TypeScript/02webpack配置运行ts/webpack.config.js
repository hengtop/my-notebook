const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename:'bundle.js',
    path:path.resolve(__dirname, "./build")
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module:{
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new CleanWebpackPlugin()
  ]
}