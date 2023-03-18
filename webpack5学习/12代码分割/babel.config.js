
const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'entry',
      corejs: 3,
    },
  ],
  ['@babel/preset-react'],
  ['@babel/preset-typescript'],
];

const plugins = []

//开发环境才加载react热更新插件
if(process.env.NODE_ENV === 'development') {
  plugins.push(['react-refresh/babel'])
}

module.exports = {
  presets,
  plugins
};
