const webpack = require('webpack');
//导出的为函数
const config = require('./config/webpack.common')({
  production: true
});

const complier = webpack(config);

complier.run((err, stats) => {
  if(err) {
    console.log(err);
  } else {
    console.log(stats);
  }
})


//实际上就是这样执行webpack，我们就可以不使用webpack-cli了