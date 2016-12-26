#!/usr/bin/env node

const webpack = require('webpack');
const config = require('../config.js');
const rimrafSync = require('rimraf').sync;

const INPUT_DIR = process.argv[2] || './src';
const OUTPUT_DIR = process.argv[3] || 'dist';

rimrafSync(OUTPUT_DIR);

const compiler = webpack(config(INPUT_DIR, OUTPUT_DIR));

compiler.run(function(err, stats) {
  if (err) {
    console.log('ERROR:', err);
  }
  if (stats.hasErrors()) {
    console.log(stats.ToJson());
  }
});
