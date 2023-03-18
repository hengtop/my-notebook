module.exports = {
  devServer:{
    before:require('./src/mock/index')//引入mock中的index.js文件
  }
}