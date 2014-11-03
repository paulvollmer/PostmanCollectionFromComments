var fs = require('fs');
var junk = require('junk');
var sh = require('execSync');
var verboseLog = require('./verboseLog');


function execJsdoc(file, verbose) {
  try {
    verboseLog(verbose, 'jsdoc execute '+file);
    var cmd = __dirname+'/../node_modules/.bin/jsdoc '+file+' -X';
    var result = sh.exec(cmd);
    var resultParsed = JSON.parse(result.stdout);
    return resultParsed;
  } catch(e) {
    console.error('ERROR: parse file', file, e);
    return false;
  }
}
exports.exec = execJsdoc;


function execJsdocAtDir(dir, verbose) {
  var files = null;
  var docs = [];

  try {
    files = fs.readdirSync(dir);
    var unjunkedFiles = files.filter(junk.not);
    var totalFiles = unjunkedFiles.length;
    verboseLog(verbose, '\njsdoc: total files to process: '+totalFiles);
    verboseLog(verbose, unjunkedFiles.join('\n'));

    for(var i=0; i<totalFiles; i++) {
      var result = execJsdoc(dir+'/'+unjunkedFiles[i], verbose);
      if(result !== false) docs.push({file: unjunkedFiles[i], docs: result});
      else return false;
    }
    return docs;

  } catch(e) {
    console.error('ERROR: reading directory', dir, e);
    return false;
  }
}
exports.execAtDir = execJsdocAtDir;
