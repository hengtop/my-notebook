const { fsWrite } = require("./tool");

const { outPutFileName } = require("../config");

const result = require("../handleData");

const writeData = async () => {
  console.log(outPutFileName("judy.txt"));
  await fsWrite(outPutFileName("leon.txt"), (await result).leon_result);
  await fsWrite(outPutFileName("judy.txt"),(await result).judy_result);
};

module.exports = writeData;
