const path=require('path');

module.exports={
  //入口
  entry:'./src/index.js',
  //出口
  output:{
    //路径和文件名,这里要动获取路径，要使用到node的语法
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js',
    //这个的作用就是只要涉及到url的文件就会在路径前加上./dist，使得图片正常显示
    publicPath:'dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        //css-loader只负责加载css，而还需要style-loader才能解析css文件,注意多个loader顺序是从右向左的加载的
        use: ['style-loader','css-loader' ]
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              //当加载的图片小于这个数（单位：B）就使用base646来编码使用，大于这个数时就会用file-loader来编译，，若没有安装则会报错
              limit: 13000
            }
          }
        ]
      },
      {
        test: /\.js$/,
        //排除
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  }
}


/*配置好后就可以在终端中输入 npx webpack 直接打包了，而不用像之前一样还要加上路径（注意：这里vscode要加上npx才可以）*/