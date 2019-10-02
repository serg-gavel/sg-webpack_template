//yarn add postcss-loader autoprefixer css-mqpacker cssnano --dev

module.exports = {
    plugins: [
      require('autoprefixer'),
      require('css-mqpacker'),
      require('cssnano')
    ]
  }