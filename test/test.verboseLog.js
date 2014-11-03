var assert = require('assert');
var verboseLog = require('../lib/verboseLog');


describe('verboseLog', function() {

  it('should return the log message if verbose is true', function () {
    var result = verboseLog(true, 'hello-world');
    assert.equal(result, 'hello-world');
  });

  it('should return an empty string if verbose is false', function () {
    var result = verboseLog(false, 'hello-world');
    assert.equal(result, '');
  });

});
