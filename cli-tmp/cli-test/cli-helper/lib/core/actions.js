/*
 * @Date: 2021-11-09 16:34:19
 * @LastEditors: zhangheng
 * @LastEditTime: 2023-05-31 21:07:47
 */

//引入cli颜色修改库
const path = require("path");
const { success } = require("../utils/info");
const repo = require("../config/repo.config");
//引入node工具将参数带有回调函数的函数转为promise
const { promisify } = require("util");
const down = promisify(require("download-git-repo"));
const { commandSpawn } = require("../utils/terminal");
const { compile, writeFile, createDirSync } = require("../utils/compile");
const { isFormat, formatHump } = require("../utils/str-format");
const { tryCatch } = require("../utils/try-catch");
const { checkProjectTemplate } = require("../utils/prompt");
//创建项目
const createProjectAction = async (project) => {
  try {
    /* 
      1. 通过git clone拉取cli 
      2. 执行npm install
      3. 执行npm serve   
    */
    console.log(success("   welcome to use cli-helper create project"));
    //判断系统类型执行相应的命令
    const command = process.platform === "win32" ? "npm.cmd" : "npm";
    // 用户选择的模板类型
    const { type, template } = await checkProjectTemplate();
    console.log(type, template);
    const branch = "main";
    //执行终端命令,使用git clone来
    await commandSpawn(
      "git",
      ["clone", "-b", branch, [repo[template]], project],
      {
        clone: true,
      }
    );
    //下载完成后执行npm install命令
    //await commandSpawn(command, ["install"], { cwd: `./${project}` });
    //运行项目
    // await commandSpawn(command, ["run", "serve"], { cwd: `./${project}` });
    //步骤完成提示
    console.log(success("Success!"));
  } catch (error) {
    console.log(error);
  }
};

//创建一个组件
const createCpnAction = async (name, dest) => {
  /* 
   目前创建一个基于vue3+ts的组件
   组件结构如下
   cpnName
      ---src
         ---cpName.vue
      index.ts
  基本步骤：
  1. 存有相关的模板
  2. 编译ejs模板
  3. 将生成的字符串写到.vue文件
  4. 放置到文件夹中。       
  */
  //这里规定名字格式为中划线模式，只能包含-和字母
  //首先校验名字是否正确
  if (isFormat(name, /^[-|A-Z|a-z]+$/g)) {
    const humpName = formatHump(name);
    //入口文件生成位置
    const indexTargetPath = path.resolve(dest, name, `index.ts`);
    //模板的生成位置
    const templateTargetPath = path.resolve(dest, name, "src", `${name}.vue`);
    const data = {
      name,
      humpName,
    };
    //编译写入主要文件
    tryCatch(async () => {
      //编译模板
      const templateResult = await compile("vue3-cpn/component.vue.ejs", data);
      //编译入口文件
      const indexResult = await compile("vue3-cpn/component.index.ejs", data);
      if (createDirSync(path.join(dest, name, "src"))) {
        await writeFile(templateTargetPath, templateResult);
      }
      if (createDirSync(path.join(dest, name))) {
        await writeFile(indexTargetPath, indexResult);
      }
    });
  } else {
    console.log("组件命名错误，只能有中划线和字母");
    return;
  }
};

//创建一个页面
const createPageAction = async (name, dest, router) => {
  /* 
  创建一个页面就要创建对应的路由文件，我默认的路由文件夹名为router
  页面文件结构如下：
  name
     ---name.vue
  路由文件一样
  name
     ---name.ts   
*/
  /* 这里页面不能以短横线起名，最好一个单词，当然保险起见还是驼峰转化一下 */

  const humpName = formatHump(name);
  //页面生成路径
  const _pagePath = path.resolve(dest, name, `${name}.vue`);
  //路由生成路径
  const _routePath = path.resolve(router, name, `${name}.ts`);
  //路由文件引入页面组件路径
  const pagePath = path
    .join("@", ...path.join(dest).split(path.sep).slice(1), name, `${name}.vue`)
    .replace(/\\/g, "/");
  //路由路径
  const pathArr = dest
    .replace(/(^\/*|\/*$)/g, "")
    .split("/")
    .slice(2);
  pathArr.push(name);
  const routePath = pathArr.join("/");
  //文件解析创建
  tryCatch(async () => {
    const pageResult = await compile("vue3-cpn/component.vue.ejs", {
      humpName,
    });
    const routeResult = await compile("page.router.ejs", {
      humpName,
      routePath,
      pagePath,
    });

    //写入模板
    if (
      createDirSync(path.dirname(_pagePath)) &&
      createDirSync(path.dirname(_routePath))
    ) {
      await writeFile(_pagePath, pageResult);
      await writeFile(_routePath, routeResult);
    }
  });
};

module.exports = {
  createProjectAction,
  createCpnAction,
  createPageAction,
};
