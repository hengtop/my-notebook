/*
 * @Date: 2021-11-28 21:59:43
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-28 22:06:37
 */
/*
 * @Date: 2021-11-28 21:59:38
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-28 22:03:20
 */
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  menus: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Menu",
  },
  resources: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Resource",
  },
  status: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = roleSchema;
