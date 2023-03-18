/*
 * @Date: 2021-11-09 16:23:45
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-10 17:24:17
 */

const program = require("../utils/init");

const helpOption = () => {
  //增加可选选项
  program.option(
    "-d --dest <dest>",
    "a destination folder,  example: -d /src/components"
  );
  program.option(
    "-f --framework <framework>",
    "choose framework,  example: -f vue"
  );

  program.on("--help", function () {
    console.log("Other:");
    console.log("other options...");
  });
};

module.exports = {
  helpOption,
};
