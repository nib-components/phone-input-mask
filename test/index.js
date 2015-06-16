var assert  = require('assert');
var input   = require('..');

var el;

function create() {
  el = document.createElement('input');
  return input(el);
}

describe('phone-input-mask', function() {

  describe('.accept()', function() {

    it('should accept digits', function() {
      assert(input.accept('0'));
      assert(input.accept('1'));
      assert(input.accept('2'));
      assert(input.accept('3'));
      assert(input.accept('4'));
      assert(input.accept('5'));
      assert(input.accept('6'));
      assert(input.accept('7'));
      assert(input.accept('8'));
      assert(input.accept('9'));
    });

  });

  describe('.changed()', function() {

    it('should change nothing when I enter a single digit', function() {

      var event = {
        name:           'INSERT',
        value:          '0',
        selectionStart: 1,
        selectionEnd:   1
      };

      input.changed(event);

      assert.equal(event.value, '0');
      assert.equal(event.selectionStart, 1);
      assert.equal(event.selectionEnd, 1);

    });

    it('should add a space when I enter a landline area code', function() {

      var event = {
        name:           'INSERT',
        value:          '02',
        selectionStart: 2,
        selectionEnd:   2
      };

      input.changed(event);

      assert.equal(event.value, '02 ');
      assert.equal(event.selectionStart, 3);
      assert.equal(event.selectionEnd, 3);

    });

    it('should add a space when I enter more digits', function() {

      var event = {
        name:           'INSERT',
        value:          '02 4925',
        selectionStart: 7,
        selectionEnd:   7
      };

      input.changed(event);

      assert.equal(event.value, '02 4925 ');
      assert.equal(event.selectionStart, 8);
      assert.equal(event.selectionEnd, 8);

    });

    it('should delete the digit to the left of a slash when I press backspace', function() {

      var event = {
        name:           'BACKSPACE',
        value:          '02 49251900',
        selectionStart: 7,
        selectionEnd:   7
      };

      input.changed(event);

      assert.equal(event.value, '02 4921 900');
      assert.equal(event.selectionStart, 6);
      assert.equal(event.selectionEnd, 6);

    });

    it('should limit the value to 12 characters', function() {

      var event = {
        name:           'INSERT',
        value:          '02 4925 19001234',
        selectionStart: 0,
        selectionEnd:   0
      };

      input.changed(event);

      assert.equal(event.value, '02 4925 1900');
      assert.equal(event.selectionStart, 0);
      assert.equal(event.selectionEnd, 0);

    });

  });

});