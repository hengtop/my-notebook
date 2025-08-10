/**
 * @description markdown解析,极简实现，用于理解文本编译步骤
 */
const { tokenize } = require("./tokenize");
const { generateAST } = require("./parse");
const { generateHtml } = require("./generateHtml");

function generateTokenString() {
  return `
  # 标题
  这是一个段落
  - 列表1
  - 列表2

  这是第二个段落

  1. 有序列表1
  2. 有序列表2

  ## 标题2
  `;
}

const tokens = tokenize(generateTokenString());
const ast = generateAST(tokens);

console.log(generateHtml(ast));
