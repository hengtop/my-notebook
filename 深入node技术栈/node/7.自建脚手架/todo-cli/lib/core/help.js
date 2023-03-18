/**
 * Create by zhangheng on 2021/5/2
 */
const program = require('commander');
const helpOptions = () => {
  //增加可选选项
  program.option('-d --dest <dest>', 'a destination folder,  example: -d /src/components');
  program.option('-f --framework <framework>', 'choose framework,  example: -f vue');

  program.on('--help', function () {
    console.log("");
    console.log('Other:');
    console.log('other options...');
  })
}
module.exports = helpOptions;
