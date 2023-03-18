/*
 * @Date: 2021-11-28 21:59:38
 * @LastEditors: zhangheng
 * @LastEditTime: 2021-11-28 22:08:53
 */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false, //查询时不会返回这一项
  },
  roles: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Role",
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

module.exports = userSchema;
