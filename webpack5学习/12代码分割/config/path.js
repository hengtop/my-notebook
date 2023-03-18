const path = require('path')

//工作目录，可以理解你执行命令的终端目录
const appDir = process.cwd();
const resolveApp = (relativePath) => path.resolve(appDir, relativePath);

module.exports = resolveApp;