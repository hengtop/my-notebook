// 获取元素


// 手机库存
const goods = {
  'red|32G': 3,
  "red|16G": 0,
  'blue|32G': 1,
  "blue|16G": 6,

}

class Mediator {
  constructor() {
    this.colorSelect = document.getElementById('colorSelect');
    this.numberInput = document.getElementById('numberInput');
    this.memorySelect = document.getElementById('memorySelect');
    this.colorInfo = document.getElementById('colorInfo');
    this.numberInfo = document.getElementById('numberInfo');
    this.memoryInfo = document.getElementById('memoryInfo');
    this.nextBtn = document.getElementById('nextBtn');
  }
  changed(obj) {
    const color = this.colorSelect.value;
    const number = this.numberInput.value;
    const memory = this.memorySelect.value;
    const stock = goods[color + '|' + memory];
    if (obj === this.olorSelect) {
      this.colorInfo.innerHTML = color;
    } else if (obj === this.memorySelect) {
      console.log(memory);
      this.memoryInfo.innerHTML = memory;
    } else if (obj === this.numberInput) {
      this.numberInfo.innerHTML = number;
    }
    if (!color) {
      nextBtn.disabled = true;
      nextBtn.innerHTML = '请选择手机颜色';
      return;
    }
    if (!memory) {
      nextBtn.disabled = true;
      nextBtn.innerHTML = '请选择内存';
      return;
    }
    if (!Number.isInteger(number - 0) || number <= 0) {
      nextBtn.disabled = true;
      nextBtn.innerHTML = '请输入正确的购物数量';
      return;
    }
    if (parseInt(number) > stock) {
      nextBtn.disabled = true;
      nextBtn.innerHTML = '库存不足';
      return;
    }
    nextBtn.disabled = false;
    nextBtn.innerHTML = '放入购物车';
  }
}

const mediator = new Mediator();

colorSelect.onchange = function () {
  mediator.changed(this)
}

numberInput.oninput = function () {
  mediator.changed(this)
}


memorySelect.onchange = function () {
  mediator.changed(this)
}