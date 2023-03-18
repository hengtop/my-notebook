//const resolveApp = require('./path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    hotOnly: true,
    host: '0.0.0.0',
    compress: true,
    publicPath: '/',
    //contentBase: resolveApp('./sabers'),
    //watchContentBase: true,
    proxy: {
      '/api1': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api1': ''
        },
        secure: false, //绕过https证书验证
        changeOrigin: true
      }
    }
  },
  optimization: {
    chunkIds: 'named'
  },
  plugins: [new ReactRefreshWebpackPlugin()]
};
