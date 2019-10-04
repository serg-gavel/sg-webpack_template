const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: common.externals.paths.dist,
    port: 8085,
    overlay: { warnings: false, errors: true },
    liveReload: true
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    })
  ]
});
