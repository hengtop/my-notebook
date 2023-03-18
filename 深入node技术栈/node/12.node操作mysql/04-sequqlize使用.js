/**
 * Create by zhangheng on 2021/5/16
 */
const { Sequelize } = require('sequelize');
const mysql = require('mysql2');
//创建连接
const sequelize = new Sequelize('more_to_more', 'root', '123456', {
  host:'localhost',
  dialect:'mysql'
});
//连接数据库
sequelize.authenticate().then((res) => {
  console.log('success');
}).catch((err) => {
  console.log('fail');
})
