const fs = require('fs');

//文件读取
function fsRead(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, {flag: 'r'}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}


//文件写入
function fsWrite(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, {flag: 'w'}, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
}

module.exports = {fsRead, fsWrite};
