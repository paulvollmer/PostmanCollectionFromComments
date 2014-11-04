var assert = require('assert');
var PostmanFromComments = require('../lib');


var collectionSettings = {
  name: 'test-collection',
  description: 'simple test collection'
};


describe('index', function() {

  describe('#setTagTitles', function() {
    it('should return the default tag titles', function() {
      var postman = new PostmanFromComments(collectionSettings);
      var result = postman.setTagTitles();
      var expected = {
        name: 'postmanName',
        group: 'postmanGroup',
        description: 'postmanDescription',
        method: 'postmanMethod',
        url: 'postmanUrl',
        headers: 'postmanHeaders',
        pathVariables: 'postmanPathVariables',
        preRequestScript: 'postmanPreRequestScript',
        data: 'postmanData',
        dataMode: 'postmanDataMode',
        tests: 'postmanTests',
        responses: 'postmanResponses',
        synced: 'postmanSynced',
        time: 'postmanTime'
      };
      assert.deepEqual(result, expected);
    });

    it('should return the customized tag titles', function() {
      var postman = new PostmanFromComments(collectionSettings);
      var customTags = {
        name: 'myName',
        group: 'myGroup',
        description: 'myDescription',
        method: 'myMethod',
        url: 'myUrl',
        headers: 'myHeaders',
        pathVariables: 'myPathVariables',
        preRequestScript: 'myPreRequestScript',
        data: 'myData',
        dataMode: 'myDataMode',
        tests: 'myTests',
        responses: 'myResponses',
        synced: 'mySynced',
        time: 'myTime'
      };
      var result = postman.setTagTitles(customTags);
      assert.deepEqual(result, customTags);
    });
  });

  describe('#getTagsValues()', function () {
    var expected = [
      {
        name: 'name-val',
        group: 'group-val',
        description: 'description-val',
        method: 'method-val',
        url: 'url-val',
        headers: 'headers-val',
        pathVariables: 'path-variables-val',
        preRequestScript: 'pre-request-script-val',
        data: 'data-val',
        dataMode: 'data-mode-val',
        tests: 'tests-val',
        responses: 'responses-val',
        synced: 'synced-val',
        time: 'timer-val '
      }
    ];

    it('default tag titles', function () {
      var postman = new PostmanFromComments(collectionSettings);
      var tags = [
        { originalTitle: 'postmanName',             value: 'name-val' },
        { originalTitle: 'postmanGroup',            value: 'group-val' },
        { originalTitle: 'postmanDescription',      value: 'description-val' },
        { originalTitle: 'postmanMethod',           value: 'method-val' },
        { originalTitle: 'postmanUrl',              value: 'url-val' },
        { originalTitle: 'postmanHeaders',          value: 'headers-val' },
        { originalTitle: 'postmanPathVariables',    value: 'path-variables-val' },
        { originalTitle: 'postmanPreRequestScript', value: 'pre-request-script-val' },
        { originalTitle: 'postmanData',             value: 'data-val' },
        { originalTitle: 'postmanDataMode',         value: 'data-mode-val' },
        { originalTitle: 'postmanTests',            value: 'tests-val' },
        { originalTitle: 'postmanResponses',        value: 'responses-val' },
        { originalTitle: 'postmanSynced',           value: 'synced-val' },
        { originalTitle: 'postmanTime',             value: 'timer-val ' }
      ];
      var result = postman.getTagsValues(tags);
      assert.deepEqual(result, expected);
    });

    it('custom tag titles', function () {
      var tagSettings = {
        name: 'customName',
        group: 'customGroup',
        description: 'customDescription',
        method: 'customMethod',
        url: 'customUrl',
        headers: 'customHeaders',
        pathVariables: 'customPathVariables',
        preRequestScript: 'customPreRequestScript',
        data: 'customData',
        dataMode: 'customDataMode',
        tests: 'customTests',
        responses: 'customResponses',
        synced: 'customSynced',
        time: 'customTime'
      };
      var postman = new PostmanFromComments(collectionSettings, tagSettings);
      var tags = [
        { originalTitle: 'customName',             value: 'name-val' },
        { originalTitle: 'customGroup',            value: 'group-val' },
        { originalTitle: 'customDescription',      value: 'description-val' },
        { originalTitle: 'customMethod',           value: 'method-val' },
        { originalTitle: 'customUrl',              value: 'url-val' },
        { originalTitle: 'customHeaders',          value: 'headers-val' },
        { originalTitle: 'customPathVariables',    value: 'path-variables-val' },
        { originalTitle: 'customPreRequestScript', value: 'pre-request-script-val' },
        { originalTitle: 'customData',             value: 'data-val' },
        { originalTitle: 'customDataMode',         value: 'data-mode-val' },
        { originalTitle: 'customTests',            value: 'tests-val' },
        { originalTitle: 'customResponses',        value: 'responses-val' },
        { originalTitle: 'customSynced',           value: 'synced-val' },
        { originalTitle: 'customTime',             value: 'timer-val ' }
      ];
      var result = postman.getTagsValues(tags);
      assert.deepEqual(result, expected);
    });

    it('multiple tag titles', function () {
      var postman = new PostmanFromComments(collectionSettings);
      var tags = [
        { originalTitle: 'postmanName',             value: 'name-val-1' },
        { originalTitle: 'postmanGroup',            value: 'group-val-1' },
        { originalTitle: 'postmanDescription',      value: 'description-val-1' },

        { originalTitle: 'postmanName',             value: 'name-val-2' },
        { originalTitle: 'postmanGroup',            value: 'group-val-2' },
        { originalTitle: 'postmanDescription',      value: 'description-val-2' },

        { originalTitle: 'postmanName',             value: 'name-val-3' },
        { originalTitle: 'postmanGroup',            value: 'group-val-3' },
        { originalTitle: 'postmanDescription',      value: 'description-val-3' }
      ];
      var result = postman.getTagsValues(tags);
      var expected = [
        {
          name: 'name-val-1',
          group: 'group-val-1',
          description: 'description-val-1'
        },
        {
          name: 'name-val-2',
          group: 'group-val-2',
          description: 'description-val-2'
        },
        {
          name: 'name-val-3',
          group: 'group-val-3',
          description: 'description-val-3'
        }
      ];
      assert.deepEqual(result, expected);
    });

  });

  describe('#singleFile()', function () {
    it('should return false if file cannot saved', function () {
      var postman = new PostmanFromComments(collectionSettings);
      var result = postman.singleFile('./test/fixtures/simple.js', './wrong/path.json', collectionSettings);
      assert.equal(result, false);
    });

    it('should return true if successful saved file', function () {
      var postman = new PostmanFromComments(collectionSettings);
      var result = postman.singleFile('./test/fixtures/simple.js', './test/singlefile-postman-collection.json', collectionSettings);
      assert.equal(result, true);
    });
  });

  describe('#directory()', function () {
    it('should return false if directory cannot be found', function () {
      var postman = new PostmanFromComments(collectionSettings);
      var result = postman.directory('./wrong/dir', './wrong/path.json', collectionSettings);
      assert.equal(result, false);
    });

    it('should return false if file cannot saved', function () {
      var postman = new PostmanFromComments(collectionSettings);
      var result = postman.directory('./test/fixtures', './wrong/path.json', collectionSettings);
      assert.equal(result, false);
    });

    it('should return true if successful saved file', function () {
      var postman = new PostmanFromComments(collectionSettings);
      var result = postman.directory('./test/fixtures', './test/directory-postman-collection.json', collectionSettings);
      assert.equal(result, true);
    });
  });

});
