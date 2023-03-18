//使用的生命周期是输出打包文件后
const { NodeSSH } = require("node-ssh");

class AutoUploadPlugin {
  constructor(options) {
    this.ssh = new NodeSSH();
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync(
      "AutoUploadPlugin",
      async (compilation, callback) => {
        //1.获取输出文件目录
        const outputPath = compilation.outputOptions.path;
        //2.连接远程服务器
        await this.connectServer();
        //3.删除服务器上的目录内容
        const serverDir = this.options.remotePath;
        await this.ssh.execCommand(`rm -rf ${serverDir}/*`);
        //4.上传文件
        await this.uploadFiles(outputPath, serverDir);
        console.log("内容上传完成");
        //关闭ssh
        this.ssh.dispose();

        callback();
      }
    );
  }

  async connectServer() {
    try {
      await this.ssh.connect({
        host: this.options.host,
        username: this.options.username,
        password: this.options.password,
        port: this.options.port || "22",
      });
      console.log("连接成功");
    } catch (error) {
      console.log("错误：", error);
    }
  }

  //上传文件
  async uploadFiles(localPath, remotePath) {
    const status = await this.ssh.putDirectory(localPath, remotePath, {
      recursive: true,
      concurrency: 10,
    });
    console.log("上传文件到服务器:", status ? "成功" : "失败");
  }
}

module.exports = AutoUploadPlugin;
