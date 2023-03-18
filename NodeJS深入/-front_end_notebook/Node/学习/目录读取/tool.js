/**
 * Create by zhangheng on 2020/11/28
 */
const fs = require('fs');

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

function fsWrite(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, {flag: 'a'}, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
}

module.exports = {fsRead, fsWrite};
