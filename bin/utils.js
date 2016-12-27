const shell = require('shelljs');
const path = require('path');

const getEntryPoints = (srcPath) => {
  const results = [];
  shell.ls(`${srcPath}/*.js`, `${srcPath}/*.jsx`).forEach(function(file) {
    results.push(file);
  });
  return results;
};

const getAbsolutePath = dir => path.resolve(process.cwd(), dir);

module.exports = { getEntryPoints, getAbsolutePath };
