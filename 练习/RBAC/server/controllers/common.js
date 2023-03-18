/*
 * @Date: 2021-11-29 22:39:23
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-29 23:14:33
 */
const login = async (req, res, next) => {
  try {
    res.send("login");
  } catch (error) {
    next(error);
  }
};

const permissions = async (req, res, next) => {
  try {
    res.send("get permissions");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  permissions,
};
