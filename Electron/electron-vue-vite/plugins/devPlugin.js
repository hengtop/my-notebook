import esbuild from "esbuild";
import electron from "electron";
import { spawn } from "child_process";

export const devPlugin = () => {
  console.log("server");
  return {
    name: "dev-plugin",
    // 接受一个方法，vite开发服务器实例
    async configureServer(server) {
      console.log("server");
      // 使用esbuild去同步构建项目、
      esbuild.buildSync({
        entryPoints: ["./src/main/mainEntry.js"],
        bundle: true,
        // 指定平台
        platform: "node",
        // 模块格式
        format: "esm",
        outfile: "./dist/mainEntry.js",
        // 标记外部依赖，避免打包
        external: ["electron"],
      });

      // 监听listening事件
      server.httpServer.once("listening", () => {
        console.log(server.host);
        // 启动electron进程

        // 获取服务器地址信息，包括ip 端口
        // 获取ipv4的地址

        const addressInfo = server.httpServer.address();
        console.log(addressInfo);
        const url = `http://${
          addressInfo.family === "IPv6"
            ? `[${addressInfo.address}]`
            : addressInfo.address
        }:${addressInfo.port}`;

        // 创建一个子进程来运行electron服务
        const electronProcess = spawn(electron, ["./dist/mainEntry.js", url], {
          cwd: process.cwd(), // 子进程的工作目录
          stdio: "inherit", // 继承父进程的标准输入输出
        });

        // 监听electron的close事件
        electronProcess.on("close", () => {
          server.close();
          process.exit();
        });
      });
    },
  };
};

export const getReplacer = () => {
  // 一些常用模块
  let externalModels = [
    "fs",
    "path",
    "os",
    "child_process",
    "crypto",
    "http",
    "buffer",
    "url",
    "better-sqlite3",
    "knex",
    "events",
  ];

  // 生成替换函数
  let result = {};
  for (const element of externalModels) {
    result[element] = () => ({
      find: new RegExp(`^${element}$`),
      code: `const ${element} = require('${element}'); export { ${element} as default }`,
    });
  }

  // 处理electron对应的模块
  result["electron"] = () => {
    let electronModules = [
      "app",
      "autoUpdater",
      "BrowserWindow",
      "clipboard",
      "dialog",
      "ipcRenderer",
      "Menu",
      "nativeImage",
      "screen",
      "shell",
      "webFrame",
    ].join(",");

    return {
      find: new RegExp(`^electron$`),
      code: `const { ${electronModules} } = require('electron'); export { ${electronModules} }`,
    };
  };

  return result;
};
