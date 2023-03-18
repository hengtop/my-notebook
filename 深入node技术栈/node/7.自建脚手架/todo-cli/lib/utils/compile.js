/**
 * Create by zhangheng on 2021/5/2
 */
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const compile = (template, data) => {
  const templatePosition = `../templates/${template}`;
  const templatePath = path.resolve(__dirname, templatePosition);
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {data}, {}, (err, result) => {
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}

//写入文件
const writeFile = (path, content) => {
  //注意判断文件夹是否存在，没有就创建
  return fs.promises.writeFile(path, content)
}
//判断文夹是否存在
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    console.log("已经创建了")
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {//检查用户输入的目录是否创建，没有则会递归创建
      fs.mkdirSync(pathName);
      console.log(pathName,"创建好了")
      return true;
    }
  }
}

module.exports = {
  compile,
  writeFile,
  createDirSync
}
