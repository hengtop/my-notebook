/*
 * @Date: 2021-11-10 08:58:54
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-10 11:45:10
 */

const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const { warn, success } = require("../utils/info");

//封装一个变异函数，传入命令参数指定生成的页面类型和名称
const compile = (template, data) => {
  //获取模板文件路径
  const templatePosition = `../templates/${template}`;
  const templatePath = path.resolve(__dirname, templatePosition);
  //编译模板
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

//写入文件
const writeFile = (path, content) => {
  return fs.promises.writeFile(path, content);
};

//判断文件夹是否存在,不存在就创建
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    console.log(warn(pathName, "  文件夹已经创建了"));
    return true;
  } else {
    //判断上级目录是否存在
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName);
      console.log(success(`  ${pathName}创建成功！`));
      return true;
    }
  }
};

module.exports = {
  compile,
  writeFile,
  createDirSync,
};
