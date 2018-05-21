// 配置想要编译的入口文件
const entry = {
  // resourceDetails: "./src/ResourceDetails/index.js",
  // test: "./src/test/index.js",
};

// **********************  以下 AUTO  **********************
const AUTO_DIR_NAME = "src";

const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "..", AUTO_DIR_NAME);
console.log(`Root: ${root}\n`);
const srcDirNames = fs.readdirSync(root);
console.log(`搜索到的文件列表: ${srcDirNames}\n`);

const filterDirNames = srcDirNames.filter(dirName => {
  if (/^[A-Z]/.test(dirName)) {
    return true;
  }
  return false;
});
console.log(`默认针对首字母大写的文件: ${filterDirNames}\n`);

const oFileMap = {};
filterDirNames.forEach(dirName => {
  let key = dirName.split("").map((str, index) => {
    if (index === 0) {
      return str.toLowerCase();
    }
    return str;
  }).join("");
  let value = path.join(root, dirName);
  oFileMap[key] = value;
});

module.exports = Object.assign({}, oFileMap, entry);