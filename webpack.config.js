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
    publicPath: '/build',
  },
  context: __dirname + '/src',
  entry: {
    vendor: [
      'angular',
      'angular-messages',
      'angular-material',
      'angular-route',
      'angular-mocks',
      'angular-sanitize',
    ],
    index: ['./index.js'],
  },
  output: {
    path: __dirname + '/public/build',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js',
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap') },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap'),
      },
      {
        test: /\.js$/,
        loader: 'ng-annotate!babel',
        exclude: /node_modules|bower_components/,
      },
      { test: /\.jade$/, loader: 'jade' },
      { test: /\.(png|jpg|svg|woff)$/, loader: 'file-loader?name=assets/[path][name]-[hash].[ext]' },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    // extract inline css into separate 'styles.css'
    new ExtractTextPlugin('styles.css'),
  ],
};
