const rename = require("gulp-rename");

const stylus = require("gulp-stylus");

module.exports = (gulp, opts = {}) => {
  let name = opts.name;
  if (!name) {
    throw new Error("name is null...");
  }
  let root = opts.root;
  if (!root) {
    throw new Error("root is null...");
  }

  // stylus 
  gulp.task(`${name}`, function () {
    gulp
      .src(root + "stylus/**/[!@]*.styl", {
        base: root
      })
      .pipe(stylus())
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace(/^([/|\\]?)stylus([/|\\]?)/ig, "$1css\\auto$2");
        path.basename += "-stylus";
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
    gulp.watch([root + "stylus/**/*.styl"], [`${name}`]);
  });
};