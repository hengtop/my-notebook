/**
 * @description 根据token生成抽象语法树
 * @param {Array} tokens
 * @returns
 */
function generateAST(tokens) {
  // 初始化抽象语法树的根节点
  const ast = {
    type: "root",
    children: [],
  };

  // 保存当前列表
  let currentList = null;

  tokens.forEach((token) => {
    const { type } = token;

    switch (type) {
      case "heading":
      case "paragraph":
        // 清空下当前的列表父节点
        currentList = null;
        // 标题和段落，直接推入即可
        ast.children.push(token);
        break;
      case "list-item":
        // 处理列表
        const { ordered } = token;
        if (!currentList) {
          currentList = {
            type: ordered ? "ordered-list" : "unordered-list",
            children: [],
            ordered,
          };

          ast.children.push(currentList);
        }
        // 处理列表项
        currentList.children.push({
          type: "list-item",
          text: token.text,
        });
        break;
    }
  });

  return ast;
}

module.exports = {
  generateAST,
};
