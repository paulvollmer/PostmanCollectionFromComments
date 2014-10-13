var assert = require('assert');
var PostmanFromComments = require('../lib');


describe('index', function() {

  var postmanCollectionSettings = {
    name: 'test-collection',
    description: 'simple test collection'
  };

  describe('#getTagsValues()', function () {
    var expected = {
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
    };

    it('default tag titles', function () {
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
      var p = PostmanFromComments.getTagsValues(tags);
      assert.deepEqual(p, expected);
    });

    it('custom tag titles', function () {
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
      var options = {
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
      var p = PostmanFromComments.getTagsValues(tags, options);
      assert.deepEqual(p, expected);
    });
  });

  describe('#singleFile()', function () {
    it('should return false if file cannot saved', function () {
      var p = PostmanFromComments.singleFile('./test/fixtures/sample.js', './wrong/path.json', postmanCollectionSettings);
      assert.equal(p, false);
    });

    it('should return true if successful saved file', function () {
      var p = PostmanFromComments.singleFile('./test/fixtures/sample.js', './test/singlefile-postman-collection.json', postmanCollectionSettings);
      assert.equal(p, true);
    });
  });

  describe('#directory()', function () {
    it('should return false if directory cannot be found', function () {
      var p = PostmanFromComments.directory('./wrong/dir', './wrong/path.json', postmanCollectionSettings);
      assert.equal(p, false);
    });

    it('should return false if file cannot saved', function () {
      var p = PostmanFromComments.directory('./test/fixtures', './wrong/path.json', postmanCollectionSettings);
      assert.equal(p, false);
    });

    it('should return true if successful saved file', function () {
      var p = PostmanFromComments.directory('./test/fixtures', './test/directory-postman-collection.json', postmanCollectionSettings);
      assert.equal(p, true);
    });
  });

});
