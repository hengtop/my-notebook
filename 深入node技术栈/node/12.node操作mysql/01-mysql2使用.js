/**
 * Create by zhangheng on 2021/5/15
 */

const mysql = require('mysql2');

//1.创建数据库链接
const sqlConnection = mysql.createConnection({
  host:'localhost',
  port:3306,
  database:'more_to_more',
  user:'root',
  password:'123456'
});
//2.执行sql语句,通过预处理语句来执行
const statement = `SELECT * FROM student WHERE age>?; `;
sqlConnection.execute(statement, [20], (err, result, fileds) => {
  console.log(result);
  sqlConnection.end();
})
/*普通调用方式
sqlConnection.query(statement, (err, result, fileds) => {
  console.log(result);
  sqlConnection.end();//拿到结果停止
  //sqlConnection.destroy()强制停止,不返回错误信息
})

sqlConnection.on('error', (err) => {
  console.log(err)
})
*/
