function drawNode(ctx, node, x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = node.color ? "black" : "red";
  ctx.fillText(node.element, x, y);
  console.log(node);
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
    drawLine(ctx, x, y, x1, y1);
    drawTree(ctx, root.left, x1, y1, radius, levelHeight, siblingDistance / 2);
  }

  if (root.right) {
    const x2 = x + siblingDistance / 2;
    const y2 = y + levelHeight;
    drawLine(ctx, x, y, x2, y2);
    drawTree(ctx, root.right, x2, y2, radius, levelHeight, siblingDistance / 2);
  }
}

// 示例代码
const canvas = document.createElement("canvas");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const radius = 20;
const levelHeight = 50;
const siblingDistance = 200;

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
