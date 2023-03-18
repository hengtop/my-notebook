/**
 * Create by zhangheng on 2021/5/16
 */
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const mysql = require('mysql2');
//创建连接
const sequelize = new Sequelize('phone', 'root', '123456', {
  host:'localhost',
  dialect:'mysql'
});

class Product extends Model {}
Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  title: {
    type: DataTypes.STRING,
    allowNull:false
  },
  price:DataTypes.DOUBLE,
  score:DataTypes.DOUBLE

}, {
  tableName: 'products',
  createdAt:false,
  updatedAt:false,
  sequelize
});

async function queryProducts() {
  const result = await Product.findAll({
    where:{
      price:{
        [Op.gte]:8000
      }
    }
  });
  console.log(result);
}

queryProducts();

