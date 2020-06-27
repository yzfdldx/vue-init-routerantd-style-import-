'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var utils = require('./utils');

var webpack = require('webpack');

var config = require('../config');

var merge = require('webpack-merge');

var path = require('path');

var baseWebpackConfig = require('./webpack.base.conf');

var CopyWebpackPlugin = require('copy-webpack-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

var portfinder = require('portfinder');

var HOST = process.env.HOST;
var PORT = process.env.PORT && Number(process.env.PORT);
var devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: _toConsumableArray(utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    }))
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [{
        from: /.*/,
        to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
      }]
    },
    hot: true,
    contentBase: false,
    // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [new webpack.DefinePlugin({
    'process.env': require('../config/dev.env')
  }), new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
  new webpack.NoEmitOnErrorsPlugin(), // https://github.com/ampedandwired/html-webpack-plugin
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
  }), // copy custom static assets
  new CopyWebpackPlugin([{
    from: path.resolve(__dirname, '../static'),
    to: config.dev.assetsSubDirectory,
    ignore: ['.*']
  }])]
});
module.exports = new Promise(function (resolve, reject) {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort(function (err, port) {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port; // add port to devServer config

      devWebpackConfig.devServer.port = port; // Add FriendlyErrorsPlugin

      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: ["Your application is running here: http://".concat(devWebpackConfig.devServer.host, ":").concat(port)]
        },
        onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
      }));
      resolve(devWebpackConfig);
    }
  });
});