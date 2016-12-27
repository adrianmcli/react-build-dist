#!/usr/bin/env node

const shell = require('shelljs');
const webpack = require('webpack');
const config = require('../config.js');
const rimrafSync = require('rimraf').sync;

const INPUT_DIR = process.argv[2] || './src';
const OUTPUT_DIR = process.argv[3] || 'dist';

const entryPoints = [];

shell.ls(`${INPUT_DIR}/*.js`, `${INPUT_DIR}/*.jsx`).forEach(function(file) {
  entryPoints.push(file);
});

console.log('Entry points:', entryPoints);

rimrafSync(OUTPUT_DIR);

const compiler = webpack(config(entryPoints, OUTPUT_DIR));

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
