/**
 * Create by zhangheng on 2021/4/28
 */
(function() {
  require.config({
    paths: {
      "bar": "./bar",//映射关系，不要加上后缀名
      "foo": "./foo"
    }
  })
  require(['bar'], function (bar) {

  })
})();
