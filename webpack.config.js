const path = require('path')

const postCSSPlugins = [
    require("postcss-simple-vars"),
    require('postcss-mixins'),
    require("postcss-nested"),
    require("postcss-import"),
    require("autoprefixer")
]

module.exports = {
    entry: './App/assets/scripts/App.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './app')
    },
// to recompile the bundle: http://localhost:3000/invalidate
    devServer: {
        before: function(app, server){
            server._watch('./app/**/*.html')
        },
        contentBase: path.resolve(__dirname, './app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    },
    mode: 'development',
    // watch: true,
    module: {
        rules: [
            {test: /\.css$/i, use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {postcssOptions: {plugins: postCSSPlugins}}}]}
        ]
    }
}