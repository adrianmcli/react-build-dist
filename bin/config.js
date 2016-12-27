const webpack = require('webpack');
const path = require('path');
const utils = require('./utils');

// resolving for loaders and presets:
// https://github.com/babel/babel-loader/issues/166#issuecomment-160866946

const getPlugins = () => [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false,
    },
  }),
];

const getConfig = (entry, out, libraryName, bundleName, minify) => ({
  resolveLoader: { root: path.join(__dirname, 'node_modules') },
  entry,
  output: {
    path: out,
    filename: bundleName,
    libraryTarget: 'umd',
    library: libraryName,
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
  plugins: minify ? getPlugins() : [],
});

const config = (entry, out, bundleName) => {
  const libraryName = utils.stripExtension(bundleName);
  const minBundleName = `${libraryName}.min.js`;
  return [
    getConfig(entry, out, libraryName, bundleName),
    getConfig(entry, out, libraryName, minBundleName, true),
  ];
};

module.exports = config;
