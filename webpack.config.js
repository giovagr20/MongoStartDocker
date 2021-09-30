// Generated using webpack-cli https://github.com/webpack/webpack-cli
const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";
const config = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "index.js",
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.ProvidePlugin({
      _: "underscore"
  })
  ],
  devServer: {
    open: true,
    host: "localhost",
    port: 6061,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|.ejs)$/i,
        use: ["style-loader", "css-loader", "sass-loader", "ejs-loader", "node-loader"]
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
        net: "empty",
      };
    }
    return config;
  };

  return config;
};
