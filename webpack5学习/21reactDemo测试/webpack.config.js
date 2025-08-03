const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.tsx",
  output: {
    filename: "bundle.js",
    //必须是一个绝对路径
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: false,
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "saberHub😀", //设置标题
      template: "./src/public/index.html", //设置模板路径
    }),
  ],
  resolve: {
    mainFiles: ["index"],
    extensions: [".tsx", ".ts", ".js"],
  },
  mode: "development",
};
