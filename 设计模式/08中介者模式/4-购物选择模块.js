// 获取元素

const colorSelect = document.getElementById('colorSelect');
const numberInput = document.getElementById('numberInput');
const colorInfo = document.getElementById('colorInfo');
const numberInfo = document.getElementById('numberInfo');
const nextBtn = document.getElementById('nextBtn');

// 手机库存
const goods = {
  red: 3,
  blue: 6
}

colorSelect.onchange = function () {
  const color = this.value;
  const number = numberInput.value;
  stock = goods[color];
  colorInfo.innerHTML = color;
  if (!color) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '请选择手机颜色';
    return;
  }
  if (!Number.isInteger(number - 0) || number <= 0) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '请输入正确的购物数量';
    return;
  }
  if (number > stock) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '库存不足';
    return;
  }
  nextBtn.disabled = false;
  nextBtn.innerHTML = '放入购物车';
}

numberInput.oninput = function () {
  const color = colorSelect.value;
  number = this.value;
  stock = goods[color];
  numberInfo.innerHTML = number;
  if (!color) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '请选择手机颜色';
    return
  }
  if (!Number.isInteger(number - 0) || number <= 0) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '请输入正确的购物数量';
    return;
  }
  if (number > stock) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '库存不足';
    return;
  }
  nextBtn.disabled = false;
  nextBtn.innerHTML = '放入购物车';
}