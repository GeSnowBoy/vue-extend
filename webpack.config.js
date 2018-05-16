var path = require("path");
var webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function resolve(pathStr) {
  return path.resolve(__dirname, pathStr);
}

const isDev = process.env.type;
module.exports = {
  mode: "development",
  entry: {
    index: resolve("./src/test.js")
  },
  devServer: {
    hot: false,
    inline: true,//DevServer 会在构建完变化后的代码时通过代理客户端控制网页刷新。
    port: 8087,
    open: "http://localhost:8087/"
  },
  output: {
    path: resolve("./dist"),
    filename: "index.js",
    libraryTarget:'commonjs2',

  },
  module: {
    rules: [{
      test: /.jsx?$/,
      use: [{
        loader: "babel-loader",
        query: {
          presets: "es2015"
        }

      }]
    }]
  },
  plugins: !isDev ? [] : [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]

};