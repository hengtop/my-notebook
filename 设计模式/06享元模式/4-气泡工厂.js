class ToolTipFactory {
  constructor() {
    this.toolTipPool = []
  }
  // 获取
  create() {
    if (this.toolTipPool.length === 0) {
      console.log('创建6个div执行了几次');
      const div = document.createElement('div');
      document.body.appendChild(div);
      return div;
    } else {
      return this.toolTipPool.shift();
    }
  }
  // 回收
  recover(tooltipDom) {
    return this.toolTipPool.push(tooltipDom)
  }
}

const toolTipFactory = new ToolTipFactory();

// 保存以创建的节点
const ary = []

for (let i = 0, str; str = ['A', 'B'][i++];) {
  const toolTip = toolTipFactory.create();
  toolTip.innerHTML = str;
  ary.push(toolTip);
}

//回收节点
for (let i = 0, dom; dom = ary[i++];) {
  toolTipFactory.recover(dom);
}

// 再次创建
for (let i = 0, str; str = ['A1', 'B2', 'C', 'D', 'E', 'F'][i++];) {
  const toolTip = toolTipFactory.create();
  toolTip.innerHTML = str;
  ary.push(toolTip);
}