/*
 * @Date: 2021-11-10 10:57:44
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-10 11:06:02
 */
const tryCatch = async (fn) => {
  try {
    return await fn.apply(this);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  tryCatch,
};
