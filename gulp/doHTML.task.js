const minifyHtml = require("gulp-minify-html");
const cheerio = require("gulp-cheerio"); //html文档操作

const moment = require("moment");
const PackageInfo = require("../package.json");

const date = moment();
const BuildDate = date.format("YYYY.MM.DD.HH.mm.ss.S");

/**
 * 处理模版中html文件，并输出
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

  // 处理主引导index.html，并修改js引用，压缩，并输出
  gulp.task(`${name}:index`, function () {
    console.log("处理Index.html");
    gulp
      .src(root + "index.html", {
        base: root
      })
      .pipe(
        cheerio(function ($) {
          $("head").prepend(
            "<script type=\"text/javascript\">window.__Build__ = \"" +
            BuildDate +
            "\"</script>"
          );
          $("script").each(function () {
            let src = $(this).attr("src");
            if (src) {
              $(this).attr("src", src + "?v=" + BuildDate.replace(/\./g, "_"));
            }
          });
        })
      )
      .pipe(minifyHtml())
      .pipe(gulp.dest(outpath));
  });

  gulp.task(`${name}`, [`${name}:index`], function () {
    console.log("处理HTML");
    gulp
      .src(root + "pages/**/*.html", {
        base: root
      })
      .pipe(minifyHtml()) //压缩
      .pipe(gulp.dest(outpath));
  });
};