const { src, dest, watch, series, parallel } = require("gulp");
const htmlMin = require("gulp-htmlmin");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const postcssPresetEnv = require("postcss-preset-env");
const inject = require("gulp-inject");
const browserSync = require("browser-sync");
const del = require("del")

const htmlTask = () => {
  return src("./gulpdemo/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("./gulpdist"));
};

const jsTask = () => {
  return src("./gulpdemo/js/*.js", { base: "./gulpdemo" })
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(
      terser({
        mangle: {
          toplevel: true,
        },
      })
    )
    .pipe(dest("./gulpdist"));
};

const lessTask = () => {
  return src("./gulpdemo/css/*.less", { base: "./gulpdemo" })
    .pipe(less())
    .pipe(postcss([postcssPresetEnv()]))
    .pipe(dest("./gulpdist"));
};

const injectHtml = () => {
  return src("./gulpdist/index.html")
    .pipe(
      inject(src(["./gulpdist/js/*.js", "./gulpdist/css/*.css"]), {
        relative: true, //设置注入文件为相对路径
      })
    )
    .pipe(dest("./gulpdist"));
};

//搭建本地服务器
const bs = browserSync.create();
const serve = () => {
  watch("./gulpdemo/*.html", series(htmlTask, injectHtml));
  watch("./gulpdemo/js/*.js", series(jsTask, injectHtml));
  watch("./gulpdemo/css/*.less", series(jsTask, lessTask));
  bs.init({
    port: 8888,
    open: true,
    file: "./gulpdist/*",
    server: {
      baseDir: "./gulpdist",
    },
  });
};

const clean = () => {
  return del(['gupldist'])
}
//打包
const buildTask = series(clean, parallel(htmlTask, jsTask, lessTask), injectHtml)
//服务端运行
const serveTask = series(buildTask, serve)
module.exports = {
  buildTask,
  serveTask
};

