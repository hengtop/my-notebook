/*
 * @Date: 2021-11-28 21:09:16
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-29 22:37:52
 */
const { Role } = require("../models");

const list = async (req, res, next) => {
  try {
    const ret = await Role.find().populate("menus");
    res.status(200).json(ret);
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const ret = await new Role(req.body).save();
    res.status(200).json(ret);
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    await Role.findByIdAndUpdate(req.params.id, req.body);
    const ret = await Role.findById(req.params.id);
    res.status(201).json(ret);
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res, next) => {
  try {
    //先找到对应的对象
    await Role.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const ret = await Role.findById(req.params.id).populate("menus");
    res.status(200).json(ret);
  } catch (error) {
    next(error);
  }
};
const updateMenus = async (req, res) => {
  const ret = await Role.findById(req.params.id);
  //保存角色菜单信息
  ret.menus = req.body.menus;
  await ret.save();
  res.status(201).json(ret);
};

module.exports = {
  list,
  create,
  update,
  remove,
  getOne,
  updateMenus,
};
