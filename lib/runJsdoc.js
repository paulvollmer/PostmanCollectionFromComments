var fs = require('fs');
var sh = require('execSync');


function execJsdoc(file) {
  try {
    var result = sh.exec('jsdoc '+file+' -X');
    var resultParsed = JSON.parse(result.stdout);
    return resultParsed;
  } catch(e) {
    console.error('ERROR: parse file', file, e);
    return false;
  }
}
exports.exec = execJsdoc;


function execJsdocAtDir(dir) {
  var files = null;
  var docs = [];

  try {
    files = fs.readdirSync(dir);
    var totalFiles = files.length;
    console.log('jsdoc: total files to process '+totalFiles);

    for(var i=0; i<totalFiles; i++) {
      var result = execJsdoc(dir+'/'+files[i]);
      if(result !== false) docs.push({file: files[i], docs: result});
      else return false;
    }
    return docs;

  } catch(e) {
    console.error('ERROR: reading directory', dir, e);
    return false;
  }
}
exports.execAtDir = execJsdocAtDir;
