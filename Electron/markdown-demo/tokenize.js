/**
 * @description markdownText分词生成token
 * @param {*} markdownText
 * @returns tokens
 */
function tokenize(markdownText) {
  // 首先对markdownText进行文本行分割
  const lines = markdownText.split("\n");
  // 存储解析的token
  const tokens = [];

  // 遍历每一行
  for (let line of lines) {
    line = line.trim();
    // 如果是空行,则跳过
    if (line === "") {
      continue;
    }
    // 判断是那种markdown元素
    if (line.startsWith("#")) {
      // 确定标题的级别 判断#数量
      const level = line.match(/^#+/)[0].length;
      // 获取标题文本
      const text = line.slice(level).trim();

      tokens.push({
        type: "heading",
        level,
        text,
      });
      // 无序列表
    } else if (line.startsWith("- ")) {
      const text = line.slice(2).trim();
      tokens.push({
        type: "list-item",
        ordered: false,
        text,
      });
      // 是否是有序列表
    } else if (line.match(/^\d+\./)) {
      const text = line.slice(2).trim();
      tokens.push({
        type: "list-item",
        ordered: true,
        text,
      });
      // 就是普通段落了
    } else if (line !== "") {
      tokens.push({
        type: "paragraph",
        text: line,
      });
    }
  }

  console.log(tokens);
  return tokens;
}

module.exports = {
  tokenize,
};
