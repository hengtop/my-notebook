/**
 * Create by zhangheng on 2021/5/2
 */
const clc = require("cli-color");
const path = require('path');
const {promisify} = require('util');//可以将含有回调函数参数的函数转换程promise的形式
const download = promisify(require('download-git-repo'));
const {vueRpo} = require('../config/repo.config');
const {commandSpawn} = require('../utils/terminal');
const {compile, writeFile, createDirSync} = require('../utils/compile')
//输入主要命令需要执行的action
const createProjectAction = async (project) => {
  //克隆项目
  try {
    console.log(clc.green("     welcome to use the cli create tool."));
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    await download(vueRpo, project, {clone: true});
    //执行npm i  这里注意window上实际上执行的是npm.cmd  所以直接这样写再mac和linux上可以的，win就不行
    await commandSpawn(command, ['install'], {cwd: `./${project}`})
    //运行 npm run serve
    await commandSpawn(command, ['run', 'serve'], {cwd: `./${project}`})
  } catch (e) {
    console.log(e)
  }
}
//添加组件的action
const addCpnAction = async (name, dest) => {
  /*
  1.有对应的ejs模板
  2.编译ejs模板
  3.生成字符串写入.vue文件中
  4.放置到对应文件夹中*/
  try {
    const result = await compile('component.vue.ejs', {name, className: `${name.toLowerCase()}-container`});
    if (createDirSync(dest)) {
      const targetPath = path.resolve(dest, `${name}.vue`);//如果在处理完所有给定的 path 片段之后还未生成绝对路径，则会使用当前工作目录。
      await writeFile(targetPath, result);
    }
  } catch (e) {
    console.log(e);
  }
}

//添加页面
const addPageAction = async (name, dest) => {
  try {
    const pageResult = await compile('component.vue.ejs', {name, className: `${name.toLowerCase()}-container`});
    const routeResult = await compile('router.vue.ejs', {name});
    const targetDest = path.resolve(dest, name.toLowerCase());
    if (createDirSync(targetDest)) {
      const pageTargetPath = path.resolve(targetDest, `${name}.vue`);//如果在处理完所有给定的 path 片段之后还未生成绝对路径，则会使用当前工作目录。
      const routerTargetPath = path.resolve(targetDest, 'router.js');//如果在处理完所有给定的 path 片段之后还未生成绝对路径，则会使用当前工作目录。
      await writeFile(pageTargetPath, pageResult);
      await writeFile(routerTargetPath, routeResult);
    }
  } catch (e) {
    console.log(e);
  }
}

//添加store
const addStoreAction = async (name, dest) => {
  try {
    const storeResult = await compile('vuex-store.vue.ejs', {});
    const typeResult = await compile('vuex-types.vue.ejs', {});
    const targetDest = path.resolve(dest, name.toLowerCase());
    if (createDirSync(targetDest)) {
      const storeTargetPath = path.resolve(targetDest, `index.js`);//如果在处理完所有给定的 path 片段之后还未生成绝对路径，则会使用当前工作目录。
      const typeTargetPath = path.resolve(targetDest, 'types.js');//如果在处理完所有给定的 path 片段之后还未生成绝对路径，则会使用当前工作目录。
      await writeFile(storeTargetPath, storeResult);
      await writeFile(typeTargetPath, typeResult);
    }
  } catch (e) {
    console.log(e);
  }
}
module.exports = {
  createProjectAction,
  addCpnAction,
  addPageAction,
  addStoreAction
}
