/*
 * @Date: 2021-11-10 10:18:59
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-10 10:27:43
 */
//判断格式是否正确

const isFormat = (str, rule) => {
  return rule.test(str);
};

//中划线转驼峰
const formatHump = (str) => {
  return str.replace(/[-_\s]+(\w)/g, (_, $1) => $1.toUpperCase());
};

module.exports = {
  isFormat,
  formatHump,
};
