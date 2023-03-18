//编辑输入输出目录
const path = require("path");

//比赛记录入口目录
const entryFileName = path.resolve("record/record.txt");

//比赛结果输出目录
const outPutFileName = (pathName) => {
  return path.resolve('result/',pathName);
};


module.exports = {
  entryFileName,
  outPutFileName,
};
