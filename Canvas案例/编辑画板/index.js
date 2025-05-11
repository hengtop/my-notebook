const colorPicker = document.querySelector("#color");
const cvs = document.querySelector("#canvas");
const ctx = cvs.getContext("2d");

const DPR = devicePixelRatio;

function init() {
  const w = 500;
  const h = 300;
  cvs.width = w * DPR;
  cvs.height = h * DPR;
  cvs.style.width = w + "px";
  cvs.style.height = h + "px";
  cvs.style.backgroundColor = "#f2f3f4";
}

init();

const shapes = [];

function getShape(x, y) {
  for (let i = shapes.length - 1; i >= 0; i--) {
    const shape = shapes[i];
    if (shape.isInside(x, y)) {
      return shape;
    }
  }
  return null;
}

class RectRangle {
  constructor(startX, startY, color) {
    this.startX = startX;
    this.startY = startY;
    this.color = color;
    // 初始化时结束坐标和开始坐标是一致的
    this.endX = startX;
    this.endY = startY;
  }

  get minX() {
    return Math.min(this.startX, this.endX);
  }

  get minY() {
    return Math.min(this.startY, this.endY);
  }

  get maxX() {
    return Math.max(this.startX, this.endX);
  }

  get maxY() {
    return Math.max(this.startY, this.endY);
  }

  isInside(x, y) {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.minX * DPR,
      this.minY * DPR,
      (this.maxX - this.minX) * DPR,
      (this.maxY - this.minY) * DPR
    );
    // 边框
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 3 * DPR;
    ctx.strokeRect(
      this.minX * DPR,
      this.minY * DPR,
      (this.maxX - this.minX) * DPR,
      (this.maxY - this.minY) * DPR
    );
  }
}

const rect = new RectRangle(10, 10, "red");

rect.endX = 200;
rect.endY = 200;

rect.draw();

cvs.onmousedown = (e) => {
  const cvsRect = cvs.getBoundingClientRect();
  const shape = getShape(e.offsetX, e.offsetY);
  if (shape) {
    const sx = e.offsetX,
      sy = e.offsetY;
    const { startX, startY, endX, endY } = shape;
    window.onmousemove = (e) => {
      const x = e.clientX - cvsRect.left;
      const y = e.clientY - cvsRect.top;
      const dx = x - sx;
      const dy = y - sy;
      shape.startX = startX + dx;
      shape.startY = startY + dy;
      shape.endX = endX + dx;
      shape.endY = endY + dy;
    };
  } else {
    const rect = new RectRangle(e.offsetX, e.offsetY, colorPicker.value);
    shapes.push(rect);

    window.onmousemove = (e) => {
      const x = e.clientX - cvsRect.left;
      const y = e.clientY - cvsRect.top;
      rect.endX = x;
      rect.endY = y;
    };
  }

  window.onmouseup = () => {
    // 清除事件
    window.onmousemove = null;
    window.onmouseup = null;
  };
};

// 循环绘制
function drawAll() {
  console.log("draw");
  requestAnimationFrame(drawAll);

  // 清空画布
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  for (const shape of shapes) {
    shape.draw();
  }
}

drawAll();
