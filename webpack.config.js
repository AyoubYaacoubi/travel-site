let currentTask = process.env.npm_lifecycle_event
const path = require("path")

const postCSSPlugins = [require("postcss-hexrgba"), require("postcss-simple-vars"), require("postcss-mixins"), require("postcss-nested"), require("postcss-import"), require("autoprefixer")]

let config = {
  entry: "./App/assets/scripts/App.js",
  module: {
    rules: [{test: /\.css$/i, use: ["style-loader", "css-loader?url=false", {loader: "postcss-loader", options: {postcssOptions: {plugins: postCSSPlugins}}}]}],
  },
}

if (currentTask == "dev") {
  config.output = {
    filename: "main.js",
    path: path.resolve(__dirname, "app"),
  }
  config.devServer = {
    before: function (app, server) {
      server._watch("./app/**/*.html")
    },
    contentBase: path.resolve(__dirname, "./app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0",
  }
  config.mode = "development"
}

if (currentTask == "build") {
  config.output = {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  }
  config.mode = "production"
}

module.exports = config

// dont forgot the package task initializer: ===========
