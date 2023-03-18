/*
 * @Date: 2022-03-20 19:38:32
 * @LastEditors: zhangheng
 * @LastEditTime: 2022-03-20 21:00:09
 */


function hySetTimeout(fn,duration) {
  fn()
}

hySetTimeout(function() {
  console.log(this);
})
