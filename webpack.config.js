let currentTask = process.env.npm_lifecycle_event
const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const fse = require("fs-extra")

// const postCSSPlugins = [require("postcss-import"), require("postcss-simple-vars"), require("postcss-nested"), require("postcss-mixins"), require("autoprefixer")]
const postCSSPlugins = [
  "postcss-import",
  "postcss-simple-vars",
  "postcss-nested",
  "postcss-mixins",
  "autoprefixer", // some
]

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy Images", function () {
      fse.copySync("./app/assets/images", "./docs/assets/images")
    })
  }
}

let cssConfig = {
  test: /\.css$/i,
  use: [
    "css-loader?url=false",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {plugins: postCSSPlugins},
      },
    },
  ],
}

let pages = fse
  .readdirSync("./app")
  .filter(function (file) {
    return file.endsWith(".html")
  })
  .map(function (page) {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `./app/${page}`,
    })
  })

let config = {
  entry: "./App/assets/scripts/App.js",

  module: {
    rules: [cssConfig],
  },

  plugins: pages,
}

// the development proccess here:
if (currentTask == "dev") {
  cssConfig.use.unshift("style-loader")

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

// the build proccess here:
if (currentTask == "build") {
  cssConfig.use.unshift(MiniCssExtractPlugin.loader)

  config.module.rules.push({
    test: /\.js$/,
    exclude: "/(node_modules)/",
    use: {
      loader: "babel-loader",
      options: {presets: ["@babel/preset-env"]},
    },
  })

  config.output = {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "docs"),
  }

  config.mode = "production"

  config.optimization = {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {chunks: "all"},
  }

  config.plugins.push(new CleanWebpackPlugin(), new MiniCssExtractPlugin({filename: "style.[chunkhash].css"}), new RunAfterCompile())
}

module.exports = config

// dont forgot the package task initializer: ===========
