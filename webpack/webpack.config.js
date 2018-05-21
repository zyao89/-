const webpack = require("webpack");
const path = require("path");
const entry = require("./entry.config.js");

const PRODUCTION = process.env.NODE_ENV === "production";

const config = {
  entry,
  output: {
    filename: "[name].wp.js",
    path: path.resolve(__dirname, "../Components")
  },
  watch: false,
  profile: true,
  cache: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
      } /*解析css, 并把css添加到html的style标签里*/
    ]
  },
  externals: {
    jquery: "jQuery",
    moment: "moment",
    _: "_",
    angular: "angular"
  },
  plugins: [
    new webpack.ProvidePlugin({ // 用途：$出现，就会自动加载模块；$默认为'jquery'的exports
      // $: "jquery",
    }),
    new webpack.DefinePlugin({ // 用途：定义全局常量
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
      PRODUCTION: JSON.stringify(PRODUCTION),
      // APP_CONFIG: JSON.stringify(appConfig[process.env.NODE_ENV]),
    }),
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // 用途：忽略regExp匹配的模块
    // new ExtractTextPlugin(PRODUCTION ? "[name]-[chunkhash].css" : "[name].css"),  // 用途：分离css文件
    // new HtmlWebpackPlugin({ // 用途：重构入口html，动态添加<link>和<script>，在以hash命名的文件上非常有用，因为每次编译都会改变
    //   template: "./src/index.html"
    // }),

    // new webpack.optimize.UglifyJsPlugin(), // 用途：js压缩  < 4.0
    new webpack.optimize.OccurrenceOrderPlugin(true), // 通过模块调用次数给模块分配ids，常用的ids就会分配更短的id，使ids可预测，减小文件大小，推荐使用
  ],
  optimization: {
    splitChunks: {
      name: "common"
    },
    minimize: false
  }
};

module.exports = config;
