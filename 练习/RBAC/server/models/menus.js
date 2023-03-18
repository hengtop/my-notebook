/*
 * @Date: 2021-11-28 21:59:48
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-28 22:12:09
 */

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

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  unique: {
    type: String,
    unique: true,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Number,
    default: 0,
  },
  sort: {
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

module.exports = menuSchema;
