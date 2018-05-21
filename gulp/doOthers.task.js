/**
 * 处理相关其他文件，并输出
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
    console.log("处理其它");
    gulp
      .src(
        [
          root + "/favicon.ico",
          root + "images/**/*.*",
          root + "lib/**/*.*",
          root + "i18n/**/*.*",
          root + "test/**/*.*"
        ], {
          base: root
        }
      )
      .pipe(gulp.dest(outpath));
  });
};