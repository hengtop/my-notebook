class ObjectPoolFactory {
  constructor(createObjFn) {
    this.objectPool = [];
    this.createObjFn = createObjFn;
  }
  create(...args) {
    const obj = this.objectPool.length === 0 ?
      this.createObjFn.apply(...args) :
      this.objectPool.shift();

    return obj;
  }
  recover(obj) {
    this.objectPool.push(obj);
  }
}

// 创建一些iframe的对象池

const iframeFactory = new ObjectPoolFactory(function () {
  const iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  iframe.onload = function () {
    iframe.onload = null;
    // 加载完成后就回收
    iframeFactory.recover(iframe);
  }
  return iframe;
});

const iframe1 = iframeFactory.create();
iframe1.src = 'http://music.topzhang.cn'

const iframe2 = iframeFactory.create();
iframe2.src = 'http://topzhang.cn';

const iframe3 = iframeFactory.create();
iframe3.src = 'https://altria.topzhang.cn';


// 切换一个展示
setTimeout(() => {
  iframe4 = iframeFactory.create();
  iframe4.src = "http://music.163.com"
}, 3000)


setTimeout(() => {
  console.log(iframeFactory.objectPool);
}, 9000)