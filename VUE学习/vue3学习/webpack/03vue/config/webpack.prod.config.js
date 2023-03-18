const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge")
const commConfig = require("./webpack.comm.config")
module.exports = merge(commConfig, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
  ]
})