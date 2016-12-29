const path = require('path');

// const shell = require('shelljs');

// const getEntryPoints = (srcPath) => {
//   const results = [];
//   shell.ls(`${srcPath}/*.js`, `${srcPath}/*.jsx`).forEach(function(file) {
//     results.push(file);
//   });
//   return results;
// };

const getAbsolutePath = dir => path.resolve(process.cwd(), dir);

const stripExtension = x => x.replace(/\.[^/.]+$/, '');

module.exports = {
  // getEntryPoints,
  getAbsolutePath,
  stripExtension,
};
