const path = require('path')

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: './dist'
    }
}