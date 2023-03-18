/**
 * Create by zhangheng on 2021/5/4
 */
const fs = require('fs');
const sharp = require('sharp');
/*const buf = Buffer.from('张恒', 'utf8');
console.log(buf.toString('utf8'));*/

/*fs.readFile('./mei.jpg', (err, data) => {
  console.log(data);
  fs.writeFile('./mei-copy.jpg', data, (err) => {
    console.log(err);
  })
})*/


sharp('./saber.png')
  .resize(1000,2000, {
    fit:'fill'
  })
  .toFile('./saber-cut.png')
