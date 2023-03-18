const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
  module: {
    rules: [
      /* {
        test: /\.js$/,
        use: {
          loader:"saber01",
          options: {
            name:'saber',
            age:12 
          }
        }
      },
      {
        test: /\.js$/,
        use: "saber02",
        enforce:'pre'
      },
      {
        test: /\.js$/,
        use: "saber03"
      }, */
      {
        test: /\.js$/i,
        use: [
          {
            loader: "saber-babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      { 
        test: /\.md$/i, 
        use:[
         /*  'html-loader', */
          'saber-md-loader',
        ]
      },
      {
        test:/\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  //loader路径查找简化
  resolveLoader: {
    modules: ["node_modules", "./saber-loader"],
  },
};
