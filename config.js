var path = require('path');

// resolving for loaders and presets:
// https://github.com/babel/babel-loader/issues/166#issuecomment-160866946

const config = (src, out) => ({
  resolveLoader: { root: path.join(__dirname, 'node_modules') },
  devtool: 'source-map',
  entry: src,
  output: {
    path: out,
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
        query: { presets: [require.resolve('babel-preset-latest'), 'react'] },
      },
    ],
  },
});

module.exports = config;
