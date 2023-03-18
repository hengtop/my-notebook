/**
 * Create by zhangheng on 2021/5/8
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json(['zhangsan', 'saber', 'lisi'])
})

router.post('/create', (req, res, next) => {
  res.json('创建成功')
})

router.get('/:id', (req, res, next) => {
  res.json(`第${req.params.id}个用户`);
})

module.exports = router;
