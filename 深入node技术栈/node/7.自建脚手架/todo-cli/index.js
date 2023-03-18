#!/usr/bin/env node

//添加脚本命令库
const program = require('commander');
const helpOptions = require('./lib/core/help');
const createCommand = require('./lib/core/create');
program.version(require('./package.json').version, '-v, --version');
/*这里的版本号不能写死,可以获取json对象的版本号,
  可以添加第二个参数来指定查看版本号的命令，但是会覆盖掉默认的命令 -V*/

//添加显示帮助选项
helpOptions();

//主要命令执行
createCommand();

//解析全局变量
program.parse(process.argv);



