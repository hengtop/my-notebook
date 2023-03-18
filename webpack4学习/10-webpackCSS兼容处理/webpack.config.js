const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
//设置nodejs的环境变量
//process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/build.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          //'style-loader',
          //使用miniCssExtractPlugin.loader取代style-loader就可以实现将css单独分离打包出来
          miniCssExtractPlugin.loader,
          'css-loader',
          /* 
            css兼容处理  依赖 postcss 库--->  需下载下面两个依赖  postcss-loader postcss-preset-env
          */
          //第一种写法，使用loader的默认配置
          //'postcss-loader'  但是这种写法什么都没配置，只有默认的
          //第二种写法  修改loader的配置
          {
            loader: 'postcss-loader',//当然如果就单写这一句和上一句一样的作用
            options: {
              //注意这里写法可能会随着版本而变化，所以要时刻关注各个插件的写法变化
                //postcss的插件,下面这个插件主要用来读取package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式
                /* 
                  "browserslist": {
                    // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
                    "development": [
                      "last 1 chrome version",//兼容最近一个的谷歌版本
                      "last 1 firefox version",
                      "last 1 safari version"
                    ],
                    // 生产环境：默认是看生产环境（与本文件的mode设置无关）
                    "production": [
                      ">0.2%",//出了0.2%的浏览器版本其他都兼容
                      "not dead",//不兼容已经死掉的（ie10）浏览器
                      "not op_mini all"//不兼容所有欧朋浏览器
                    ]
                  } 
                  */
                 postcssOptions: {
                   plugins: [
                     ['postcss-preset-env',{}]
                   ]
                 }   
            }
          }

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
      filename: 'css/built.css'
    })
  ],
  mode: 'development'
}