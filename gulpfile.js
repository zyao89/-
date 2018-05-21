"use strict"; //采用严格模式

const gulp = require("gulp");
const config = require("./gulp/config");

const g_sRootPath = config.rootPath;
const g_sOutPath = config.outPath;

console.log("\n ============ Gulp Build Start ============ \n");

/**
 * Release输出
 */
gulp.task("default", function () {
  gulp.start("doOutDest");
});

gulp.task("doOutDest", ["doLess", "doStylus", "webpack", "clean"], function () {
  gulp.start(
    "doJs",
    "doCss",
    "doHtml",
    "doOther"
  );
  console.log("Finish...");
});

/**
 * do JS
 */
const doJSTask = require("./gulp/doJS.task");
doJSTask(gulp, {
  name: "doJs",
  root: g_sRootPath,
  outpath: g_sOutPath
});

/**
 * do CSS
 */
const doCSSTask = require("./gulp/doCSS.task");
doCSSTask(gulp, {
  name: "doCss",
  root: g_sRootPath,
  outpath: g_sOutPath
});

/**
 * do HTML
 */
const doHTMLTask = require("./gulp/doHTML.task");
doHTMLTask(gulp, {
  name: "doHtml",
  root: g_sRootPath,
  outpath: g_sOutPath
});

/**
 * do Others
 */
const doOthersTask = require("./gulp/doOthers.task");
doOthersTask(gulp, {
  name: "doOther",
  root: g_sRootPath,
  outpath: g_sOutPath
});

/**
 * 清空整个输出工程
 */
const doCleanTask = require("./gulp/doClean.task");
doCleanTask(gulp, {
  name: "clean",
  root: g_sRootPath,
  outpath: g_sOutPath
});

/**
 * DO Stylus
 */
const doStylusTask = require("./gulp/doStylus.task");
doStylusTask(gulp, {
  name: "doStylus",
  root: g_sRootPath
});

/**
 * DO Less
 */
const doLessTask = require("./gulp/doLess.task");
doLessTask(gulp, {
  name: "doLess",
  root: g_sRootPath
});

/**
 * lint
 */
const lintTask = require("./gulp/lint.task");
lintTask(gulp, {
  name: "lint",
  root: g_sRootPath
});

/**
 * webpack
 */
const webpackTask = require("./gulp/webpack.task");
webpackTask(gulp, {
  name: "webpack"
});