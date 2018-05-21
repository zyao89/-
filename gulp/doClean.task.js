const clean = require("gulp-clean");

/**
 * 清空整个输出工程
 */
module.exports = (gulp, opts = {}) => {
  let name = opts.name;
  if (!name) {
    throw new Error("name is null...");
  }
  let outpath = opts.outpath;
  if (!outpath) {
    throw new Error("outpath is null...");
  }
  gulp.task(`${name}`, function () {
    console.log("Clean " + outpath + " all...");
    return gulp.src(outpath, {
      read: false
    }).pipe(clean({
      force: true
    }));
  });
};