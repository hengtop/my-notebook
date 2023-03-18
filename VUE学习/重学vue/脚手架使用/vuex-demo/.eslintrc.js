module.exports = {
  root: false,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
 /*  extends: [
    'plugin:vue/essential',
    '@vue/prettier'
  ],
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/prettier'
  ], */
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
