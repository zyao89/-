const webpack = require("webpack");
const webpackConfig = require("../webpack/webpack.config.js");
const clean = require("gulp-clean");

module.exports = (gulp, opts = {}) => {
  let name = opts.name;
  if (!name) {
    throw new Error("name is null...");
  }

  /**
	 * 清空输出工程
	 */
  gulp.task(`${name}:clean`, function() {
    let p = webpackConfig.output.path;
    return gulp.src(p, { read: false }).pipe(clean({ force: true }));
  });

  gulp.task(`${name}`, [`${name}:clean`], function(callback) {
    console.log("Gulp Webpack");
    webpack(webpackConfig, function(err, stats) {
      compileLogger(err, stats);
      callback();
    });
  });

  // 生成js/css-监听模式
  gulp.task(`${name}:watch`, [`${name}:clean`], function() {
    webpack(
      Object.assign(webpackConfig, {
        watch: true
      })
    ).watch({
      aggregateTimeout: 300,
      poll: 1000
    }, function(err, stats) {
      compileLogger(err, stats);
    });
  });

  const compileLogger = function compileLogger(err, stats) {
    if (err || stats.hasErrors()) {
      // 在这里处理错误
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }
      const info = stats.toJson();
    
      if (stats.hasErrors()) {
        console.error(info.errors);
      }
    
      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }
    }
  };
};
