const path = require('path')

const postCSSPlugins = [
    require('postcss-import'),
    require('autoprefixer')
]

module.exports = {
    entry: './App/assets/scripts/App.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './app')
    },
    mode: 'development',
    watch: true,
    module: {
        rules: [
            {test: /\.css$/i, use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader', options: {postcssOptions:{plusgins: postCSSPlugins}}}]}
        ]
    }
}