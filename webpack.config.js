var path = require('path');
var webpack = require('webpack');
var packageData = require('./package.json');

module.exports = {
  entry: path.resolve(__dirname, './public/index.js'),
  output: {
    path: path.resolve(__dirname, './public/build'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    inline: true,
    port: 3000
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
