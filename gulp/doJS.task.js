const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const ngmin = require("gulp-ng-annotate"); // new
const stripDebug = require("gulp-strip-debug");
const sourcemaps = require("gulp-sourcemaps");

/**
 * 处理js文件，并输出
 */
module.exports = (gulp, opts = {}) => {
  let name = opts.name;
  if (!name) {
    throw new Error("name is null...");
  }
  let root = opts.root;
  if (!root) {
    throw new Error("root is null...");
  }
  let outpath = opts.outpath;
  if (!outpath) {
    throw new Error("outpath is null...");
  }

  gulp.task(`${name}`, function () {
    console.log("处理JS");
    gulp
      .src(root + "js/**/*.js")
      .pipe(sourcemaps.init())
      .pipe(stripDebug())
      .pipe(babel())
      .pipe(ngmin({
        dynamic: false
      }))
      //.pipe(concat('all.min.js'))  // 合并匹配到的js文件并命名为 "all.js"
      .pipe(
        uglify({
          mangle: true, //类型：Boolean 默认：true 是否修改变量名
          compress: true //类型：Boolean 默认：true 是否完全压缩
        })
      )
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(outpath + "/js"));
  });
};