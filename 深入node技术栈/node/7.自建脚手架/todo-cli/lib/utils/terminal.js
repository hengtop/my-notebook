/**
 * Create by zhangheng on 2021/5/2
 */
//执行一些终端命令
const { spawn } = require('child_process')//子进程模块
const commandSpawn = (...args) => {
  return new Promise((resolve) => {
    //进程中会有很多执行过程的命令，但是这里我们开了一个子进程来执行npm install，所以会无法显示，
    const childProcess = spawn(...args);
    //将子进程的输出通过管道流传到父进程的输出中去就可以展示信息了
    childProcess.stdout.pipe(process.stdout);
    //错误信息也一并传过去
    childProcess.stderr.pipe(process.stderr);
    //监听完成
    childProcess.on('close', () => {
      resolve();
    })
  })
}
module.exports = {
  commandSpawn
}

