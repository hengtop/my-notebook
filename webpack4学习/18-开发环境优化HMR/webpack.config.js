
/* HMR
   热模块替换，表示打包文件中其中一个文件修改了，不会对所有要打包的文件进行打包，只对改动过的进行加载
    样式文件：可以使用HMR功能
    js文件默认没有HMR功能,需要在index，js中监听
    HTML默认没有HMR功能，
    而且也不能热更新了  解决方式，在entry中引入html文件的路径,对于html我们不需要设置HMR  
   */


const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:['./src/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname,'build/'+getNowFormatTime())
  },
  module: {
    rules: [
      {
        //处理less资源
        test: /\.less$/,
        use:['style-loader', 'css-loader', 'less-loader']
      },
      {
        //处理css资源
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        //处理样式中的图片资源
        test: /\.(jpg|png|gif)$/,
        loader:'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          //修改图片输出路径到img下
          outputPath:'img'
        }
      },
      {
        //处理html中的图片
        test: /\.html$/,
        loader:'html-loader',
      },
      {
        //处理其他资源
        exclude:/\.(html|css|js|json|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath:'static'
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname,'build'),
    compress: true,
    port:3000,
    open:true,
    hot: true//开启热打包
  }
}




function getNowFormatDay(nowDate) {
  if(nowDate == null){
      nowDate = new Date();
  }
  var day = nowDate.getDate();
  var month = nowDate.getMonth() + 1;//注意月份需要+1
  var year = nowDate.getFullYear();
  //补全0，并拼接
  return "" + year  + completeDate(month) +completeDate(day);
}

function getNowFormatTime() {
  var nowDate = new Date();
  var h = nowDate.getHours();
  var m = nowDate.getMinutes();
  var s = nowDate.getSeconds();
  //补全0，并拼接
  return "" + getNowFormatDay(nowDate) + completeDate(h)+ completeDate(m) + completeDate(s);
}


//补全0
function completeDate(value) {
  return value < 10 ? "0"+value:value;
}