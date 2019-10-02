const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const React = require('react');
const ReactDOM = require('react-dom');

// const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: './public/index.html',
	inject: 'body',
	minify: false,
});

const env = process.env.WEBPACK_ENV;

const libraryName = 'react-infinite-carusel';
let plugins = [], output, entry, externals;

if (env === 'build') {
  // plugins.push(new UglifyJsPlugin({ minimize: true }));
  entry = './src/index.js';
  output = {
    path: path.join(__dirname, 'lib'),
    filename: 'react-infinite-carousel.min.js',
    library: 'InfiniteCarousel',
    libraryTarget: 'umd',
  };
  externals = [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ];
} else {
  plugins.push(HtmlWebpackPluginConfig);
  entry = './public/app.js';
  output = {
    path: path.resolve('dist'),
		filename: 'index_bundle.js',
  };
  externals = [];
}

const config = {
  entry,
  devtool: 'source-map',
  output,
  plugins,
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules'],
      },
      {
				test: /(\.jsx|\.js)$/,
				exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./public'), 'node_modules'],
    extensions: ['.js'],
  },
  externals,
};

module.exports = config;
