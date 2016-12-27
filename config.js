var path = require('path');

// resolving for loaders and presets:
// https://github.com/babel/babel-loader/issues/166#issuecomment-160866946

const config = (entryPoints, out) => ({
  resolveLoader: { root: path.join(__dirname, 'node_modules') },
  devtool: 'source-map',
  entry: entryPoints,
  output: {
    path: out,
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  externals: {
    react: 'React',
  },
  module: {
    loaders: [
      {
        test: /[.js|.jsx]$/,
        loader: require.resolve('babel-loader'),
        query: { presets: [
          'babel-preset-latest',
          'babel-preset-stage-3',
          'babel-preset-react',
        ].map(require.resolve),
        },
      },
    ],
  },
});

module.exports = config;
