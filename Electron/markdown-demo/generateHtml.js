function generateHtml(node) {
  // 根据节点类型生成html
  if (node.type === "root") {
    return `<div>${node.children.map(generateHtml).join("")}</div>`;
  } else if (node.type === "heading") {
    // 标题节点，根据等级生成对应的标签
    return `<h${node.level}>${node.text}</h${node.level}>`;
  } else if (node.type === "paragraph") {
    // 段落节点
    return `<p>${node.text}</p>`;
  } else if (node.type === "ordered-list" || node.type === "unordered-list") {
    // 列表节点
    const tag = node.ordered ? "ol" : "ul";

    // 递归处理节点的children
    return `<${tag}>${node.children.map(generateHtml).join("")}</${tag}>`;
  } else if (node.type === "list-item") {
    return `<li>${node.text}</li>`;
  }
}

module.exports = {
  generateHtml,
};
