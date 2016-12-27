#!/usr/bin/env node

const program = require('commander');
const rimrafSync = require('rimraf').sync;
const webpack = require('webpack');

const utils = require('./utils');
const config = require('./config.js');

// get inputs
program
  .version('0.0.1')
  .option('-b, --bundle-name [filename]', 'Output bundle filename')
  .parse(process.argv);

const bundleName = program.bundleName || 'MyBundle.js';
const inputDir = program.args[0] || 'src';
const outputDir = program.args[1] || 'dist';

// process inputs
const pathToSrc = utils.getAbsolutePath(inputDir);
const pathToDist = utils.getAbsolutePath(outputDir);

// wipe directory
rimrafSync(pathToDist);

// begin compilation
const compiler = webpack(config(pathToSrc, pathToDist, bundleName));
compiler.run(function(err, stats) {
  if (err) {
    console.log('ERROR:', err);
  }
  if (stats.hasErrors()) {
    console.log(stats.toJson());
  } else {
    console.log('Build successful!');
  }
});
