var express = require("express");
var router = express.Router();
var axios = require("axios").default;

const path = require("path");

const fs = require("fs");

let JSESSIONID = "";

const createBaseURL = req => {
  let port = req.app.get("PORT") || 3000;
  let baseURL = `${req.protocol}://${req.hostname}:${port}`;
  return baseURL;
};

const createHanders = req => {
  let jsid = req.query.jsid || JSESSIONID;
  return {
    Cookie: `JSESSIONID=${jsid}`
  };
};

// 创建
router.get("/:type/:name/:size", function(req, res, next) {
  let size = req.params.size || 1;
  let name = req.params.name || "";
  if (name == "") {
    return res.send("name is null...");
  }
  let type = req.params.type || "";
  if (type == "") {
    return res.send("type is null...");
  }
  let DB = fs.readFileSync(path.resolve(__dirname, `../json/${type}.json`), "utf-8");
  if (DB == null) {
    return res.send("DB is null...");
  }
  DB = JSON.parse(DB);
  try {
    JSESSIONID = DB["jsid"];
  } catch (error) {
    console.error(error);
  }
  let JsonData = DB[name];
  if (JsonData == null) {
    return res.send("JsonData is null...");
  }
  console.log(JsonData);
  let baseURL = createBaseURL(req);
  let url = `${baseURL}${JsonData.url}`;
  console.log(url, size);
  let p = [];
  for (let i = 0; i < size; i++) {
    let param = JSON.stringify(JsonData["data"]).replace(
      /#\{i\}/gim,
      Math.random()
        .toString(32)
        .substring(7) + i
    );
    let promise = new Promise(resolve => {
      setTimeout(() => {
        axios.post(url, JSON.parse(param), {
          headers: createHanders(req),
          withCredentials: true
        }).then((r) => {
          console.log(`[${name}](${i}) => `, r.data);
          resolve(r);
        });
      }, 100 * i);
    });
    p.push(promise);
  }
  Promise.all(p).then(function(ar) {
    console.log("OK。。。");
    res.send("OK");
  });
});

module.exports = router;
