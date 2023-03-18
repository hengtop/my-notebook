/*
 * @Date: 2021-11-09 17:37:02
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-09 17:59:52
 */
//这里处理一些终端执行命令
//node自带的子进程模块
const { spawn } = require("child_process");

const commandSpawn = (...args) => {
  return new Promise((resolve) => {
    //开启一个子进程来执行命令
    const childProcess = spawn(...args);
    //子进程的信息是不会展示的，所以要将信息传入给父进程process展示
    childProcess.stdout.pipe(process.stdout);
    //错误信息也一并输出过去
    childProcess.stderr.pipe(process.stderr);
    //监听命令执行完成
    childProcess.on("close", () => {
      resolve();
    });
  });
};

module.exports = {
  commandSpawn,
};
