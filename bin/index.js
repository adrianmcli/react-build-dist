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
  .option('-p, --package-json [path]', 'Path to package.json directory with react-build-dist config override')
  .option('-x, --stage-0', 'Turn on stage-0 for experimental features.')
  .parse(process.argv);

const bundleName = program.bundleName || 'MyBundle.js';
const experimental = program.stage0;
const inputDir = program.args[0] || 'src';
const outputDir = program.args[1] || 'dist';
const packageJSONDir = program.packageJson;

// process inputs
const pathToSrc = utils.getAbsolutePath(inputDir);
const pathToDist = utils.getAbsolutePath(outputDir);

// wipe directory
rimrafSync(pathToDist);

// begin compilation
const compiler = webpack(config({
  entry: pathToSrc,
  out: pathToDist,
  bundleName,
  experimental,
  packageJSONDir,
}));

compiler.run((err, stats) => {
  if (err) {
    console.log('ERROR:', err);
  }
  if (stats.hasErrors()) {
    console.log(stats.toJson());
  } else {
    console.log('Build successful!');
  }
});
