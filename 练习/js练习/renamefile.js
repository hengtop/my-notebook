const fs = require("fs");
const path = require("path");

const src = 'Re：从零开始的异世界生活 - Re Zero kara Hajimeru Isekai Seikatsu\\Re：从零开始的异世界生活 - Re Zero kara Hajimeru Isekai Seikatsu (2016)\\extras'

// 读取目录下的文件
const url = path.resolve(
  "\\\\192.168.101.106\\Seagate-4T\\docker\\aria2-pro\\downloads",src
);
const fileList = fs.readdirSync(url);
console.log("fileList", fileList, fileList.length);
let count = 0;
for (const file of fileList) {
  // 过滤器他目录
  if (file === "SPs" || file === 'Season 01' || file === 'extras') continue;
  try {
    const oldPath = path.resolve(url, file);
    const newPath = path.resolve(url, file.substring(40));
    fs.renameSync(oldPath, newPath);
    count++;
  } catch (error) {
    break;
  }
}
console.log("fileList", fileList.length);
console.log("成功修改", count, "个文件");
