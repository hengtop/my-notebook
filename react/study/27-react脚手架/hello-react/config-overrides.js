//配置antd按需引入
/* module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
} */
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    //style: 'css',
    style: true,
  }),
  addLessLoader({
    lessOptions: {//这里的坑注意，官方文档是错误的
      javascriptEnabled: true,//允许用js来修改
      modifyVars: { '@primary-color': '#ccc' },
    }
  }),
);  