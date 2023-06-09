/**
 * Create by zhangheng on 2021/5/19
 */
const Router = require('koa-router');
const commentRouter = new Router({prefix:'/comment'});

const {
  create,
  reply,
  update,
  remove,
  list
} = require('../controller/comment.controller')

const {
  verifyAuth,
  verifyPermission
} = require('../middleware/auth.middleware');
const {
  checkParams
} = require('../middleware/comment.middleware')
//发表动态评论
commentRouter.post('/', verifyAuth, create);
//回复评论
commentRouter.post('/:commentId/reply', verifyAuth, reply);
//修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update);
//删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, remove);
//获取某条动态的评论
commentRouter.get('/', checkParams, list)
module.exports = commentRouter;
