/**
 * Create by zhangheng on 2021/5/16
 */
const mysql = require('mysql2');
//1.创建数据库链接
const sqlConnection = mysql.createPool({
  host:'localhost',
  port:3306,
  database:'more_to_more',
  user:'root',
  password:'123456',
  connectionLimit: 5
});
//2.
const statement = `SELECT * FROM student WHERE age>?; `;

//使用链接池方式一
sqlConnection.promise().execute(statement, [20]).then(([res, fileds]) => {
  console.log(res);
}).catch( err => {
  console.log(err);
})
