/**
 * Create by zhangheng on 2021/5/15
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
sqlConnection.execute(statement, [20], (err, result, fileds) => {
  //查询结束会自动释放链连接
  console.log(result);
  sqlConnection.end();
})

//方式二 For pool initialization, see above
/*sqlConnection.getConnection(function(err, conn) {
  // Do something with the connection
  conn.execute(statement, [20], (err, result, fileds) => {
    //查询结束会自动释放链连接
    console.log(result);

    //sqlConnection.end();
  })
  // Don't forget to release the connection when finished!
  sqlConnection.releaseConnection(conn);
})*/
