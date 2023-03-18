const marked = require('marked')
const hljs = require('highlight.js');

module.exports = function(content) {
  //处理高亮
  marked.setOptions({
    highlight: function(code, lang){
      return hljs.highlight(lang, code).value;
    }
  })
  const htmlContent = marked(content);
  const innerContent = "`" +htmlContent +"`"
  const moduleCode = `var code=${innerContent}; export default code;`
  console.log("执行md");
  console.log(htmlContent);
  //只能返回一个buffer或者字符串
  return moduleCode
}