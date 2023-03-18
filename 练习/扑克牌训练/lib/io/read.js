//数据读取
const os = require('os');
const { fsRead } = require("./tool");

const { entryFileName } = require("../config");

const readData = async () => {

  let content = await fsRead(entryFileName);
  //获取数据内容字符串
  const recordString = content.toString();
  //根据回车分割
  //获取对应系统的回车符或者换行符
  const marker = os.EOL;
  //存放到数组中
  const allRecord = recordString.split(marker);
  return allRecord;
  
}

module.exports = {
  readData
}
