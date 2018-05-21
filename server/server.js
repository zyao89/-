"use strict";

const express = require("express");
const proxyMiddleware = require("http-proxy-middleware");
const proxyTable = require("./config").proxyTable;
const axios = require("axios").default;
const moment = require("moment");

const http = require("http");
const https = require("https");

const bodyParser = require("body-parser");

const cer = require("./cer");
const privateKey = cer.privateKey;
const certificate = cer.certificate;
let credentials = null;
if (!!privateKey && !!certificate) {
  credentials = {
    key: privateKey,
    cert: certificate
  };
}

const RunServer = (env) => {
  const PORT = env.PORT;
  const SSLPORT = env.SSLPORT;
  const STATIC_PATH = env.STATIC_PATH;

  const app = express();
  const router = express.Router();
  app.set("trust proxy", "loopback");
  app.use(router);
  switch (env.name) {
  case "dev":
    {
      // test
      app.use("/test", require("./src/test"));
      const staticServe = require("./src/serve-static");
      app.use(staticServe(STATIC_PATH));

      const browserSync = require("browser-sync").create();
      browserSync
        .watch(["pages/", "js/", "css/", "*.html", "*.js", "*.css"])
        .on("change", browserSync.reload);
      browserSync.init({
        proxy: "localhost:" + PORT
      });
    }
    break;
  case "pro":
    {
      app.use(express.static(STATIC_PATH));
    }
    break;
  default:
    throw new Error("env is error...");
  }

  // proxy api requests
  Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context];
    if (typeof options === "string") {
      options = {
        target: options,
        secure: true,
        ws: true
      };
      if (!!credentials) {
        options.ssl = credentials;
      }
    }
    app.use(proxyMiddleware(options.filter || context, options));
  });

  const httpServer = http.createServer(app);
  httpServer.listen(PORT, function () {
    app.set("PORT", PORT);
    console.log("HTTP Server is running on: http://localhost:%s", PORT);
  });

  if (!!credentials) {
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(SSLPORT, function () {
      app.set("SSLPORT", SSLPORT);
      console.log("HTTPS Server is running on: https://localhost:%s", SSLPORT);
    });
  }

  app.all("/*", function (req, res, next) {
    console.log(
      moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      req.url,
      req.ip
    );
    res.sendfile("index.html");
  });
}

module.exports = RunServer;