//移动js文件到指定文件夹
const { src, dest, watch } = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const terser = require('gulp-terser')

const jsTask = () => {
  //从src文件夹中读取文件，输出到dist文件
  return src("./src/**/*.js")
    .pipe(//转义
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    //.pipe(uglify())
    .pipe(terser({//代码丑化
     mangle: {toplevel: true} 
    }))
    .pipe(dest("./dist"));
};

watch('./src/**/*.js', jsTask)
module.exports = {
  jsTask,
};
