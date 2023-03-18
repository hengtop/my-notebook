const path = require('path')
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      },
      {
        test:/\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        generator:{
          filename:"img/[name].[hash:6][ext]"
        },
        parser:{
          dataUrlCondition: {
            maxSize:1000 * 1024
          }
        }
      },
      {
        test:/\.(eot|ttf|woff2?)$/i,
        type:"asset/resource",
        generator: {
          filename:"font/[name].[hash:6][ext]"
        }
      }

    ]
  }
}
