var fs = require('fs');
var runJsdoc = require('./runJsdoc');
var defaultTagTitles = require('./defaultTagTitles');
var PostmanCollection = require('PostmanCollectionProgrammatically');
var verboseLog = require('./verboseLog');

/**
 * constructor
 */
function PostmanCollectionFromComment(postmanSettings, tagTitles, verbose) {
  this.verbose = verbose || false;
  this.tagTitle = {};
  // initialize a postman collection
  this.postman = new PostmanCollection({name: postmanSettings.name, description: postmanSettings.description});

  this.setTagTitles(tagTitles);
}
module.exports = PostmanCollectionFromComment;

/**
 * Set the tag titles we want to search.
 *
 * @return an tag titles object.
 */
PostmanCollectionFromComment.prototype.setTagTitles = function(options) {
  var tmpOptions = options || {};
  this.tagTitle = {
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
  return this.tagTitle;
};

/**
 *
 */
PostmanCollectionFromComment.prototype.getTagsValues = function(tags) {
  var self = this;

  // check for api tags and save to temp variable
  //console.log(tags.length+' doc tags found');
  var tmpApiTags = [{}];
  var tmpApiTagsIndex = 0;
  var tmpCounter = tmpApiTagsIndex;

  tags.forEach(function(tag) {
    //console.log('tag:', tag.originalTitle);

    switch (tag.originalTitle) {
      case self.tagTitle.name:
        if(tmpCounter > 0) {
          tmpApiTags.push({});
          tmpApiTagsIndex++;
        }
        verboseLog(self.verbose, 'found -> '+self.tagTitle.name);
        tmpApiTags[tmpApiTagsIndex].name = tag.value;
        tmpCounter++;
        break;

      case self.tagTitle.group:
        verboseLog(self.verbose, 'found -> '+self.tagTitle.group);
        tmpApiTags[tmpApiTagsIndex].group = tag.value;
        tmpCounter++;
        break;

      case self.tagTitle.description:
        verboseLog(self.verbose, 'found -> '+self.tagTitle.description);
        tmpApiTags[tmpApiTagsIndex].description = tag.value;
        tmpCounter++;
        break;

      case self.tagTitle.method:
        verboseLog(self.verbose, 'found -> '+self.tagTitle.method);
        tmpApiTags[tmpApiTagsIndex].method = tag.value;
        tmpCounter++;
        break;

      case self.tagTitle.url:
        verboseLog(self.verbose, 'found -> '+self.tagTitle.url);
        tmpApiTags[tmpApiTagsIndex].url = tag.value;
        tmpCounter++;
        break;

      case self.tagTitle.headers:
        verboseLog(self.verbose, 'found -> '+self.tagTitle.headers);
        tmpApiTags[tmpApiTagsIndex].headers = tag.value;
        tmpCounter++;
        break;

      case self.tagTitle.pathVariables:
        verboseLog(self.verbose, 'found -> '+self.tagTitle.pathVariables);
        tmpApiTags[tmpApiTagsIndex].pathVariables = tag.value;
        tmpCounter++;
        break;

      case self.tagTitle.preRequestScript:
        verboseLog(self.verbose, 'found -> '+self.tagTitle.preRequestScript);
        tmpApiTags[tmpApiTagsIndex].preRequestScript = tag.value;
        tmpCounter++;
        break;

      case self.tagTitle.data:
        verboseLog(self.verbose, 'found -> '+self.tagTitle.data);
        tmpApiTags[tmpApiTagsIndex].data = tag.value;
        tmpCounter++;
        break;

      case self.tagTitle.dataMode:
        verboseLog(self.verbose, 'found -> '+self.tagTitle.dataMode);
        tmpApiTags[tmpApiTagsIndex].dataMode = tag.value;
        tmpCounter++;
        break;

      // version

      case self.tagTitle.tests:
        verboseLog(self.verbose, 'found -> '+self.tagTitle.tests);
        tmpApiTags[tmpApiTagsIndex].tests = tag.value;
        tmpCounter++;
        break;

      case self.tagTitle.responses:
        verboseLog(self.verbose, 'found -> '+self.tagTitle.responses);
        tmpApiTags[tmpApiTagsIndex].responses = tag.value;
        tmpCounter++;
        break;

      case self.tagTitle.synced:
        verboseLog(self.verbose, 'found -> '+self.tagTitle.synced);
        tmpApiTags[tmpApiTagsIndex].synced = tag.value;
        tmpCounter++;
        break;

      case self.tagTitle.time:
        verboseLog(self.verbose, 'found -> '+self.tagTitle.time);
        tmpApiTags[tmpApiTagsIndex].time = tag.value;
        tmpCounter++;
        break;
    }
  });

  return tmpApiTags;
};

/**
 *
 */
PostmanCollectionFromComment.prototype.save = function(filename) {
  verboseLog(this.verbose, '\ntry to write file "'+filename+'"');

  try {
    fs.writeFileSync(filename, this.postman.getJSON());
    return true;
  } catch(e) {
    console.error('Cannot save postman collection', e);
    return false;
  }
};

/**
 *
 */
PostmanCollectionFromComment.prototype.singleFile = function(sourcefile, savefile) {
  //console.log('call singleFile', sourcefile);

  var jsdoc = runJsdoc.exec(sourcefile, this.verbose);
  //verboseLog(verbose, JSON.stringify(jsdoc, null, 2));

  for(var i=0; i<jsdoc.length; i++) {
    if(jsdoc[i].tags !== undefined) {
      var values = this.getTagsValues(jsdoc[i].tags);
      console.log(values);
      for(var j=0; j<values.length; j++) {
        this.postman.addRequest(values[j]);
      }
    }
  }

  var saved = this.save(savefile, this.postman);
  return saved;
};

/**
 *
 */
PostmanCollectionFromComment.prototype.directory = function(sourcedir, savefile) {
  //console.log('call directory', sourcedir, savefile);
  var self = this;

  var jsdocs = runJsdoc.execAtDir(sourcedir, self.verbose);
  if(jsdocs === false) return false;

  // generate postman
  //var postman = new PostmanCollection({name: options.name, description: options.description});


  // parse the jsdoc output object and create postman items
  verboseLog(self.verbose, '\nsearch the docs for');
  jsdocs.forEach(function(item) {
    verboseLog(self.verbose, '--> '+item.file);

    if (item.docs) {
      // search tags
      item.docs.forEach(function (doc) {
        if (doc.tags) {

          var values = self.getTagsValues(doc.tags);

          for(var i=0; i<values.length; i++) {
            // TODO: we need a better check if the right tags was found
            if (values[i].name !== undefined) {

              // if apiGroup tag exists
              if (values[i].group) {
                verboseLog(self.verbose, '--> add group "'+values[i].group+'"');
                self.postman.addRequest(values[i], values[i].group);
              } else {
                var tmpReq = self.postman.addRequest(values[i]);
              }

            }
          }

        }
      });
    }
  });

  var saved = self.save(savefile, self.postman);
  return saved;
};
