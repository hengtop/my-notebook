/*
 * @Date: 2021-11-28 21:09:16
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-29 22:32:08
 */
const { Menu } = require("../models");

const list = async (req, res, next) => {
  try {
    const ret = await Menu.find();
    res.status(200).json(ret);
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const ret = await new Menu(req.body).save();
    res.status(200).json(ret);
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    await Menu.findByIdAndUpdate(req.params.id, req.body);
    const ret = await Menu.findById(req.params.id);
    res.status(201).json(ret);
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res, next) => {
  try {
    //先找到对应的对象
    await Menu.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const ret = await Menu.findById(req.params.id);
    res.status(200).json(ret);
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
};
