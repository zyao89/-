const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "./");
const fileNames = fs.readdirSync(root);

const CRT = Symbol("crt");
const KEY = Symbol("key");

const cerMap = new Map();
fileNames.forEach(name => {
  if (/\.crt$/igm.test(name)) {
    cerMap.set(CRT, {
      root,
      path: path.join(root, name),
      name
    });
  } else if (/\.key$/igm.test(name)) {
    cerMap.set(KEY, {
      root,
      path: path.join(root, name),
      name
    });
  }
});

const oCrt = cerMap.get(CRT);
const oKey = cerMap.get(KEY);

if (!oCrt || !oKey) {
  throw new Error("must be *.crt and *.key");
}

module.exports = {
  crt: oCrt,
  certificate: oCrt ? fs.readFileSync(oCrt.path, "utf8") : "",
  key: oKey,
  privateKey: oKey ? fs.readFileSync(oKey.path, "utf8") : "",
};