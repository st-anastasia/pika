const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  context: __dirname + '/client',
  entry: {
    vendor: [
      "angular",
      "angular-animate",
      "angular-aria",
      "angular-material",
      "angular-messages",
      "angular-mocks",
      "angular-route",
      "angular-sanitize",
      "angular-ui-router"
    ],
    index: ['./index.js'],
  },
  output: {
    path: __dirname + '/public/build',
    filename: '[name].bundle.js',
    publicPath: '/build/'
  },
  module: {
    rules: [
      {test: /\.css$/, use: ExtractTextPlugin.extract({use:
        {loader: 'css-loader', options: {sourceMap: true}}
      })},
      {test: /\.scss$/, use: ExtractTextPlugin.extract({use: [
        {loader: 'css-loader', options: {sourceMap: true}},
        {loader: 'sass-loader', options: {sourceMap: true}}
      ]})},
      {test: /\.js$/, use: ['ng-annotate-loader','babel-loader'],
        exclude: /node_modules|bower_components/},
      {test: /\.pug$/, use: 'pug-loader'},
      {test: /\.(png|jpg|svg|woff)$/, use: {
        loader: 'file-loader',
        options: {name: '[path][name]-[hash].[ext]'}
      }}
    ]
  },
  plugins: [
    new ExtractTextPlugin('index.bundle.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
  ]
};
