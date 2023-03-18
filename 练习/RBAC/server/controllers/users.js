/*
 * @Date: 2021-11-28 21:09:16
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-29 23:19:29
 */
const { User } = require("../models");

const list = async (req, res, next) => {
  try {
    //查询你用户并将roles字段的id映射为对应的对象
    const ret = await User.find().populate("roles");
    res.status(200).json(ret);
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const ret = await new User(req.body).save();
    res.status(200).json(ret);
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    //合并对象
    await User.findByIdAndUpdate(req.params.id, req.body);
    //重新查询返回
    const ret = await User.findById(req.params.id);
    res.status(201).json(ret);
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res, next) => {
  try {
    //先找到对应的对象
    await User.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
  res.send("users remove");
};

const getOne = async (req, res, next) => {
  try {
    const ret = await User.findById(req.params.id).populate("roles");
    res.status(200).json(ret);
  } catch (error) {
    next(error);
  }
};
const updateRoles = async (req, res, error) => {
  try {
    //获取用户
    const ret = await User.findById(req.params.id);
    //保存用户角色信息
    ret.roles = req.body.roles;
    await ret.save();
    res.status(201).json(ret);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
  create,
  update,
  remove,
  getOne,
  updateRoles,
};
