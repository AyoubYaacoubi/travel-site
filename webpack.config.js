// what is the current taks:
let currentTask = process.env.npm_lifecycle_event
const path = require("path")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const fse = require("fs-extra")

const postCSSPlugins = [
  "postcss-import", // import
  "postcss-simple-vars", // vars
  "postcss-nested", // nesting
  "postcss-mixins", // mixin
  "autoprefixer", // prefix
]

// copy the assets to the dist folder.
class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy Images", function () {
      fse.copySync("./app/assets/images", "./docs/assets/images")
    })
  }
}

// the css configurations:
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

// looping through every html page and compile it with htmlwebpackplugin, vars ("./app"|file|page)
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

// global configs for the build and the development proccess: path: "./app/assets/scripts/App.js"
let config = {
  entry: "./App/assets/scripts/App.js",

  module: {
    rules: [cssConfig],
  },

  plugins: pages,
}

// the development proccess here:
if (currentTask == "dev") {
  // pushint to the css rule
  cssConfig.use.unshift("style-loader")
  // defining to the output:
  config.output = {
    filename: "main.js",
    path: path.resolve(__dirname, "app"),
  }
  // configuring the dev server:
  config.devServer = {
    before: function (app, server) {
      server._watch("./app/**/*.html")
    },
    contentBase: path.resolve(__dirname, "./app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0",
  }
  // which mode:
  config.mode = "development"
}

// the build proccess here:
if (currentTask == "build") {
  // pushing to the css rule:
  cssConfig.use.unshift(MiniCssExtractPlugin.loader)
  // pushing to the js rule: "babel"
  config.module.rules.push({
    test: /\.js$/,
    exclude: "/(node_modules)/",
    use: {
      loader: "babel-loader",
      options: {presets: ["@babel/preset-env"]},
    },
  })
  // defining the output:
  config.output = {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "docs"),
  }
  // which mode:
  config.mode = "production"
  // build optimization + using the cssminimizer:
  config.optimization = {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
    // the modules chuncks:
    splitChunks: {chunks: "all"},
  }
  // pushing the needed plugins:
  config.plugins.push(new CleanWebpackPlugin(), new MiniCssExtractPlugin({filename: "style.[chunkhash].css"}), new RunAfterCompile())
}

// export every thing:
module.exports = config

// "scripts": {
//   "dev": "webpack serve",
//   "build": "webpack",
//   "test": "echo \"Error: no test specified\" && exit 1"
// },
