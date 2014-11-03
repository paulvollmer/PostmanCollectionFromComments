var fs = require('fs');
var runJsdoc = require('./runJsdoc');
var defaultTagTitles = require('./defaultTagTitles');
var PostmanCollection = require('PostmanCollectionProgrammatically');
var verboseLog = require('./verboseLog');


function getTagsValues(tags, options) {
  // set the tag titles we want to search
  var tmpOptions = options || {};
  var tagTitle = {
    name:             tmpOptions.name             || defaultTagTitles.name,
    group:            tmpOptions.group            || defaultTagTitles.group,
    description:      tmpOptions.description      || defaultTagTitles.description,
    method:           tmpOptions.method           || defaultTagTitles.method,
    url:              tmpOptions.url              || defaultTagTitles.url,
    headers:          tmpOptions.headers          || defaultTagTitles.headers,
    pathVariables:    tmpOptions.pathVariables    || defaultTagTitles.pathVariables,
    preRequestScript: tmpOptions.preRequestScript || defaultTagTitles.preRequestScript,
    data:             tmpOptions.data             || defaultTagTitles.data,
    dataMode:         tmpOptions.dataMode         || defaultTagTitles.dataMode,
    tests:            tmpOptions.tests            || defaultTagTitles.tests,
    responses:        tmpOptions.responses        || defaultTagTitles.responses,
    synced:           tmpOptions.synced           || defaultTagTitles.synced,
    time:             tmpOptions.time             || defaultTagTitles.time,
  };

  // check for api tags and save to temp variable
  //console.log(tags.length+' doc tags found');
  var tmpApiTags = {};
  tags.forEach(function (tag) {
    //console.log('tag:', tag.originalTitle);

    switch (tag.originalTitle) {
      case tagTitle.name:
        //console.log('FOUND -> '+tagTitle.name);
        tmpApiTags.name = tag.value;
        break;

      case tagTitle.group:
        //console.log('FOUND -> '+tagTitle.group);
        tmpApiTags.group = tag.value;
        break;

      case tagTitle.description:
        //console.log('FOUND -> '+tagTitle.description);
        tmpApiTags.description = tag.value;
        break;

      case tagTitle.method:
        //console.log('FOUND -> '+tagTitle.method);
        tmpApiTags.method = tag.value;
        break;

      case tagTitle.url:
        //console.log('FOUND -> '+tagTitle.url);
        tmpApiTags.url = tag.value;
        break;

      case tagTitle.headers:
        //console.log('FOUND -> '+tagTitle.headers);
        tmpApiTags.headers = tag.value;
        break;

      case tagTitle.pathVariables:
        //console.log('FOUND -> '+tagTitle.pathVariables);
        tmpApiTags.pathVariables = tag.value;
        break;

      case tagTitle.preRequestScript:
        //console.log('FOUND -> '+tagTitle.preRequestScript);
        tmpApiTags.preRequestScript = tag.value;
        break;

      case tagTitle.data:
        //console.log('FOUND -> '+tagTitle.data);
        tmpApiTags.data = tag.value;
        break;

      case tagTitle.dataMode:
        //console.log('FOUND -> '+tagTitle.dataMode);
        tmpApiTags.dataMode = tag.value;
        break;

      // version

      case tagTitle.tests:
        //console.log('FOUND -> '+tagTitle.tests);
        tmpApiTags.tests = tag.value;
        break;

      case tagTitle.responses:
        //console.log('FOUND -> '+tagTitle.responses);
        tmpApiTags.responses = tag.value;
        break;

      case tagTitle.synced:
        //console.log('FOUND -> '+tagTitle.synced);
        tmpApiTags.synced = tag.value;
        break;

      case tagTitle.time:
        //console.log('FOUND -> '+tagTitle.time);
        tmpApiTags.time = tag.value;
        break;
    }
  });

  return tmpApiTags;
}
exports.getTagsValues = getTagsValues;


function savePostmanCollection(filename, postman, verbose) {
  //console.log('Call savePostmanCollection', filename);

  try {
    fs.writeFileSync(filename, JSON.stringify(postman, null, 2));
    verboseLog(verbose, '\nfile "'+filename+'" write success!');
    return true;
  } catch(e) {
    console.error('Cannot save postman collection', e);
    return false;
  }
}


function singleFile(sourcefile, savefile, options, tagSettings, verbose) {
  //console.log('call singleFile', sourcefile);

  var jsdoc = runJsdoc.exec(sourcefile, verbose);

  var values = getTagsValues(jsdoc[0].tags, tagSettings);

  // generate postman
  var postman = new PostmanCollection({name: options.name, description: options.description});
  postman.addRequest(values);

  var saved = savePostmanCollection(savefile, postman, verbose);
  return saved;
}
exports.singleFile = singleFile;


function directory(sourcedir, savefile, options, tagSettings, verbose) {
  //console.log('call directory', sourcedir, savefile);

  var jsdocs = runJsdoc.execAtDir(sourcedir, verbose);
  if(jsdocs === false) return false;

  // generate postman
  var postman = new PostmanCollection({name: options.name, description: options.description});


  // parse the jsdoc output object and create postman items
  verboseLog(verbose, '\nsearch the docs for');
  jsdocs.forEach(function(item) {
    verboseLog(verbose, '--> '+item.file);

    if (item.docs) {
      // search tags
      item.docs.forEach(function (doc) {
        if (doc.tags) {

          var values = getTagsValues(doc.tags, tagSettings);

          // TODO: we need a better check if the right tags was found
          if (values.name !== undefined) {

            // if apiGroup tag exists
            if (values.group) {
              console.log('--> ADD GROUP');
              postman.addRequest(values, values.group);
            } else {
              var tmpReq = postman.addRequest(values);
            }

          }
        }
      });
    }
  });

  var saved = savePostmanCollection(savefile, postman, verbose);
  return saved;
}
exports.directory = directory;
