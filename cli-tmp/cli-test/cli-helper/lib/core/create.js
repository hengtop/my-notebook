/*
 * @Date: 2021-11-09 16:27:58
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-10 17:30:02
 */
const program = require("../utils/init");
const {
  createProjectAction,
  createCpnAction,
  createPageAction,
} = require("./actions");

//创建命令
const creataCommend = () => {
  //下载cli命令
  program
    .command("create <project>")
    .description(
      "clone cli from repository into a folder. 例如：saber create vue"
    )
    .action(
      //todo something
      createProjectAction
    );

  //创建组件命令
  program
    .command("createCpn <name> [destination]")
    .description(
      "creates the component to the specified directory. 例如：saber createCpn app-bar [src/components]"
    )
    .action((name, destination) => {
      createCpnAction(name, destination || "src/components");
    });

  //创建页面命令
  program
    .command("createPage <name> [destination] [router]")
    .description(
      "creates the page to the specified directory. 例如：saber createPage login src/views src/router"
    )
    .action((name, destination, router) => {
      createPageAction(
        name,
        destination || "src/pages",
        router || "src/router"
      );
    });
};

module.exports = {
  creataCommend,
};
