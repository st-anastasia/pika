'use strict';

const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  debug: true,
  cache: false,
  // our Development Server configs
  devServer: {
    hot: true,
    inline: true,
    colors: true,
    historyApiFallback: true,
    contentBase: 'public',
    publicPath: '/build'
  },
  context: __dirname + '/src',
  entry: {
    vendor: ['angular', 'angular-route'],
    app: ['./app.js']
  },
  output: {
    path: __dirname + '/public/build',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          // activate source maps via loader query
          'css?sourceMap!' +
          'sass?sourceMap'
        )
      },
      {
        test: /\.js$/,
        loader: 'ng-annotate!babel!jshint',
        exclude: /node_modules|bower_components/
      },
      { test: /\.jade$/,  loader: 'file-loader?name=[path][name].html!jade-html-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    // extract inline css into separate 'styles.css'
    new ExtractTextPlugin('styles.css')
   ]
};
