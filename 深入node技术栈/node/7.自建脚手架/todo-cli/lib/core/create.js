/*
 * @Date: 2021-06-20 14:26:24
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-07 17:45:06
 */
/**
 * Create by zhangheng on 2021/5/2
 */
const program = require("commander");
const {
  createProjectAction,
  addCpnAction,
  addPageAction,
  addStoreAction,
} = require("./action");
const createCommand = () => {
  program
    .command("create <project>")
    .description("clone repository into a folder")
    .action(createProjectAction);
  program
    .command("addcpn <name>")
    .description(
      "add vue component,and you can specify the path .example: saber addcpn navBar -d src/components"
    )
    .action((name) => {
      addCpnAction(name, program.dest || "src/components");
    });
  program
    .command("addpage <page>")
    .description(
      "add vue page and router config, example: saber addpage Home [-d src/pages]"
    )
    .action((page) => {
      addPageAction(page, program.dest || "src/pages");
    });
  program
    .command("addstore <store>")
    .description(
      "add vue store and types config, 例如: saber addstore user [-d src/store/modules]"
    )
    .action((store) => {
      addStoreAction(store, program.dest || "src/store/modules");
    });
};
module.exports = createCommand;
