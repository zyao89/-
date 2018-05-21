const path = require("path");

// 代理配置
const proxyTable = {
  "/api": "http://10.11.11.11"
};

exports.proxyTable = proxyTable;

const config = {
  DEV: {
    name: "dev",
    PORT: 10010,
    SSLPORT: 10011,
    STATIC_PATH: "./",
  },
  PRO: {
    name: "pro",
    PORT: 10020,
    SSLPORT: 10021,
    STATIC_PATH: path.resolve(__dirname, "../dest/"),
  }
};

exports.config = config;