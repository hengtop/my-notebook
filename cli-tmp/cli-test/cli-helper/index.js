#!/usr/bin/env node
/*
 * @Date: 2021-11-09 15:08:37
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-10 17:28:19
 */

//引入commander
const program = require("./lib/utils/init");
const packageJSON = require("./package.json");
const { creataCommend } = require("./lib/core/create");
const { helpOption } = require("./lib/core/help");
//设置版本号，这里推荐引入package.json中的版本好
program.version(
  packageJSON.version,
  "-v, --version",
  "output the current version"
);

//生成主要命令
creataCommend();
//生成帮助命令
helpOption();

//解析全局变量
program.parse(process.argv);
