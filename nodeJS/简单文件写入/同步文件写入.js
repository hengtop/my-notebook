const fs  = require('fs');

fs.writeFile("C:\\Users\\hp\\Desktop\\test.txt","这是通过writeFile写入的内容",{flag:'a'},function (err) {
  if(!err){
    console.log("写入成功！");
  }else {
    console.log(err);
  }
})
