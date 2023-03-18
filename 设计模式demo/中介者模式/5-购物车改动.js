// 获取元素

const colorSelect = document.getElementById('colorSelect');
const numberInput = document.getElementById('numberInput');
const memorySelect = document.getElementById('memorySelect');
const colorInfo = document.getElementById('colorInfo');
const numberInfo = document.getElementById('numberInfo');
const memoryInfo = document.getElementById('memoryInfo');
const nextBtn = document.getElementById('nextBtn');

// 手机库存
const goods = {
  'red|32G': 3,
  "red|16G": 0,
  'blue|32G': 1,
  "blue|16G": 6,

}

colorSelect.onchange = function () {
  const color = colorSelect.value;
  const number = numberInput.value;
  const memory = memorySelect.value;
  stock = goods[color + '|' + memory];
  colorInfo.innerHTML = color;
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
  const number = numberInput.value;
  const memory = memorySelect.value;
  const stock = goods[color + '|' + memory];
  numberInfo.innerHTML = number;
  if (!color) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '请选择手机颜色';
    return
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
  if (number > stock) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '库存不足';
    return;
  }
  nextBtn.disabled = false;
  nextBtn.innerHTML = '放入购物车';
}


memorySelect.onchange = function () {
  const color = colorSelect.value;
  const number = numberInput.value;
  const memory = memorySelect.value;
  stock = goods[color + '|' + memory];
  numberInfo.innerHTML = number;
  if (!color) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '请选择手机颜色';
    return
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
  console.log(stock);
  if (number > stock) {
    nextBtn.disabled = true;
    nextBtn.innerHTML = '库存不足';
    return;
  }
  nextBtn.disabled = false;
  nextBtn.innerHTML = '放入购物车';
}