function drawNode(ctx, node, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = node.color ? "black" : "red";
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.font = "bold 18px Arial";

  const text = node.element.toString();
  const textWidth = ctx.measureText(text).width;
  const textHeight = parseInt(ctx.font.match(/\d+/)[0], 10);
  ctx.fillText(node.element, x - textWidth / 2, y + textHeight / 4);
}

function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawTree(ctx, root, x, y, radius, levelHeight, siblingDistance) {
  if (!root) return;

  drawNode(ctx, root, x, y, radius);

  if (root.left) {
    const x1 = x - siblingDistance / 2;
    const y1 = y + levelHeight;
    drawLine(ctx, x, y + radius, x1, y1);
    drawTree(ctx, root.left, x1, y1, radius, levelHeight, siblingDistance / 2);
  }

  if (root.right) {
    const x2 = x + siblingDistance / 2;
    const y2 = y + levelHeight;
    drawLine(ctx, x, y + radius, x2, y2);
    drawTree(ctx, root.right, x2, y2, radius, levelHeight, siblingDistance / 2);
  }
}

// 示例代码
const canvas = document.createElement("canvas");
canvas.width = 1500;
canvas.height = 1500;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const radius = 20;
const levelHeight = 50;
const siblingDistance = 500;

export default function printTree(root) {
  drawTree(
    ctx,
    root,
    canvas.width / 2,
    radius,
    radius,
    levelHeight,
    siblingDistance
  );
}
