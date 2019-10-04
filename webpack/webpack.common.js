const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
  assets: "assets/"
};

const PAGES_DIR = PATHS.src;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith(".html"));

module.exports = {
  externals: {
    paths: PATHS
  },

  entry: {
    app: PATHS.src
    // module: `${PATHS.src}/another-module.js`,
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /node_modules/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: { name: "[name].[ext]" }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "postcss-loader", options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: `${PATHS.assets}css/[name].[contenthash].css`,
      chunkFilename: "[id].css",
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/static`, to: "" }
    ]),
    ...PAGES.map(
      page =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page}`
        })
    )
  ]
};
