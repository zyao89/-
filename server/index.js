"use strict";

const env = (process.env.NODE_ENV || "").trim();
const config = require("./config").config;
const server = require("./server");

// dev
server(config.DEV);

if (env === "production") {
  console.log(env + " running...");
  // production
  server(config.PRO);
}
