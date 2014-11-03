var assert = require('assert');
var runJsdoc = require('../lib/runJsdoc');


describe('runJsdoc', function() {

  describe('#exec()', function () {
    it('should return false if jsdoc failed', function () {
      var result = runJsdoc.exec('./wrong/path');
      assert.equal(result, false);
    });

    it('should return true if jsdoc successful exit', function () {
      var result = runJsdoc.exec('./test/fixtures/simple.js');
      assert.ok(typeof result === 'object');
    });
  });

  describe('#dir()', function () {
    it('should return false if directory cannot be found', function() {
       var result = runJsdoc.execAtDir('./wrong/path');
       assert.equal(result, false);
     });

     it('should return the jsdoc object', function() {
       var result = runJsdoc.execAtDir('./test/fixtures');
       assert.equal(result.length, 1);
     });
  });

});
