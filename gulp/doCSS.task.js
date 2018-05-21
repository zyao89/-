const cssmin = require("gulp-cssmin"); // new
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

/**
 * 处理Css文件，并输出
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
    console.log("处理CSS");
    gulp
      .src(root + "css/**/*.css", {
        base: root
      })
      .pipe(sourcemaps.init())
      .pipe(postcss([autoprefixer()]))
      .pipe(cssmin()) //压缩css
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(outpath));
  });
};