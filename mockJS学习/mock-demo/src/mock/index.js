const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');
const Mock = require('mockjs');

//读取json5文件
function get_JSON5_File(filePath) {
  let json5 = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');//读取json5文件
  return JSON5.parse(json5);//转成对象
}

module.exports = function (app) {
  if (process.env.MOCK == 'true') {//辨识环境变量，当满足就执行
    app.get('/user/userinfo', function (rep, res) {
      let obj = get_JSON5_File('./userinfo.json5');
      res.json(Mock.mock(obj));
    });
  }

}