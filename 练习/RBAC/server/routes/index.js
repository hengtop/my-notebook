/*
 * @Date: 2021-11-28 21:01:11
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-29 23:11:47
 */
const express = require("express");
const useCtrl = require("../controllers/users");
const roleCtrl = require("../controllers/roles");
const menuCtrl = require("../controllers/menus");
const commonCtrl = require("../controllers/common");

//1.创建一个路由容器
const router = express.Router();

//2.将路由挂载给路由容器，路由只做分发，不做具体处理

//登录
router.post("/login", commonCtrl.login);

//获取权限列表
router.get("/permissions", commonCtrl.permissions);

//用户管理路由
router
  .get("/users", useCtrl.list) //获取用户列表
  .post("/users", useCtrl.create) //创建用户
  .put("/users/:id", useCtrl.update) //更新用户
  .delete("/users/:id", useCtrl.remove) //删除用户
  .get("/users/:id", useCtrl.getOne) //根据id获取单个用户
  .patch("/users/:id/roles", useCtrl.updateRoles); //给用户分配角色

//角色管理路由
router
  .get("/roles", roleCtrl.list) //获取角色列表
  .post("/roles", roleCtrl.create) //创建角色
  .put("/roles/:id", roleCtrl.update) //更新角色
  .delete("/roles/:id", roleCtrl.remove) //删除角色
  .get("/roles/:id", roleCtrl.getOne) //根据id获取单个用户
  .patch("/roles/:id/menus", roleCtrl.updateMenus); //给角色分配权限

//菜单管理路由
router
  .get("/menus", menuCtrl.list) //获取菜单列表
  .post("/menus", menuCtrl.create) //创建菜单
  .put("/menus/:id", menuCtrl.update) //更新菜单
  .delete("/menus/:id", menuCtrl.remove) //删除菜单
  .get("/menus/:id", menuCtrl.getOne); //根据id获取单个菜单

//3.将路由容器导出挂载到express应用实例上生效
module.exports = router;
