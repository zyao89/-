const rename = require("gulp-rename");

const less = require("gulp-less");

module.exports = (gulp, opts = {}) => {
  let name = opts.name;
  if (!name) {
    throw new Error("name is null...");
  }
  let root = opts.root;
  if (!root) {
    throw new Error("root is null...");
  }

  // less 
  gulp.task(`${name}`, function () {
    gulp
      .src(root + "less/**/[!@]*.less", {
        base: root
      })
      .pipe(less())
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace(/^([/|\\]?)less([/|\\]?)/ig, "$1css\\auto$2");
        path.basename += "-less";
        path.extname = ".css";
        console.log(`${path.basename}${path.extname}`);
      }))
      .pipe(gulp.dest(root));
  });

  /**
   * watch
   */
  gulp.task(`${name}:watch`, function () {
    console.log("Gulp CSS Watch");
    gulp.watch([root + "less/**/*.less"], [`${name}`]);
  });
};