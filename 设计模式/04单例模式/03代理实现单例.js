const CreateDiv = function(html) {
  this.html = html;
  this.init();
}


CreateDiv.prototype.init = function() {
  console.log('初始化');
}


const ProxySingletonCreateDiv = (function() {
  let instance = null;
  return function(html) {
    if(!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  }
})();

const p1 = new CreateDiv('zhangsan');
const p2 = new CreateDiv('lisi');
const p3 = ProxySingletonCreateDiv('zhangsan');
const p4 = ProxySingletonCreateDiv('lisi');
console.log(p1 === p2);
console.log(p3 === p4);